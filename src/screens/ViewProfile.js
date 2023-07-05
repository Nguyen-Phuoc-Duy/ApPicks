import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/authProvider"
import loginStyles from "../css/login";
import useAlert from '../hook/useAlert';
import Loader from "../components/loader";
import InputCustom from "../components/inputCustom";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import color from "../constant/colorVariable";
import { Ionicons } from "@expo/vector-icons";

const ViewProfile = ({ navigation, route }) => {
    const { user, useFetch } = useContext(AuthContext);
    const [isLoading, setIsloading] = useState(false);
    const [changePWD, setChangePWD] = useState(false);
    const [profile, setProfile] = useState();
    const [formValue,setFormValue] = useState({
        name: '',
        currentPWD: '',
        password: '',
        'Re-password': ''
    });
    const [errForm, setErrForm] = useState({
        name: '',
        password: '',
        currentPWD: ''
    })

    const handleLockOrUnlock = async (user) => {
        try {
            setIsloading(true);
            if (!user) return;
            let opts = {};
            let message = '';
    
            if (user.locked) {
                opts.isLocked = false;
                message = 'Are you sure you want to unLocked this user?';
            } else {
                opts.isLocked = true;
                message = 'Are you sure you want to locked this user?';
            }
    
            let confirm = await useAlert.alertSync('Are you sure', message);
    
            if (!confirm) return;
    
            const result = await useFetch('admin/lockOrUnlockUser/' + user.ID, opts, 'POST');
            if (result.errCode === 200) {
                let newProfile = {...user, locked: opts.isLocked};
                setProfile(newProfile);
                useAlert.alert('Success', `${opts.isLocked ? 'User already locked' : 'User already unlocked'}`);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setIsloading(false);
        }
      }

    useEffect(() => {
        try {
            if (route?.params) {
                let { info } = route.params;
                setProfile(info);
            }
        } catch (e) {
            console.log(e);
        }
    }, [route?.params])

    useEffect(() => {
        if (profile && profile.email && profile.name) {
            let defaultValue = {
                email: profile.email,
                name: profile.name
            }
            setFormValue(defaultValue);
        }
        if (user && user.role !== 'employee' && profile) {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity onPress={() => handleLockOrUnlock(profile)}>
                        <Ionicons 
                            name={profile.locked ? 'lock-open-outline' : 'lock-closed-outline'}
                            size={30}
                            color={color.primary}
                        />
                    </TouchableOpacity>
                )
            })
        }
    }, [profile])

    const handleChangeValueForm = (field,value) => {
        let newForm = {...formValue};
        newForm[field] = value;
        setFormValue(newForm);
        setErrForm({
            name: '',
            password: '',
            currentPWD: ''
        })
    }

    const handleResetPassword = async () => {
        if (!profile || !profile.ID) return;
        setIsloading(true);
        const result = await useFetch('admin/resetPassword/' + profile.ID);

        if (result.errCode === 200) {
            useAlert.alert(result.data, 'Is new password reset');
        } else {
            useAlert.alert('Reset failed', result.errMsg || 'Reset password failed!');
        }
        setIsloading(false);
    }
    
    const handleSubmitForm = async () => {
        try {
            let { name, password, currentPWD } = formValue;
            if (name === user.name && !password) return;
            if (password && formValue['Re-password'] !== password) {
                setErrForm({
                    ...errForm,
                    password: 'Mật khẩu không khớp!'
                })
            }else if (!name) {
                setErrForm({
                    ...errForm,
                    name: 'Name is required!'
                })
            }else {
                setIsloading(true);
                let result = await useFetch('users/updateProfile', { ID: user.ID, name, password, currentPWD }, 'POST')
                if (result.errCode === 200) {
                    setChangePWD(false);
                    useAlert.alert('Update user', 'User updated successfully!');
                } else if (result.errCode === 401) {
                    setErrForm({
                        ...errForm,
                        currentPWD: result.errMsg || 'Update failed!'
                    })
                }
                else {
                    setErrForm({
                        ...errForm,
                        password: result.errMsg || 'System Error!'
                    })
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsloading(false);
        }
    }

    useEffect(() => {
        if (!changePWD) {
            setFormValue({...formValue, password: '', ['Re-password']: '', currentPWD: ''})
        }
    },[changePWD])

    return (
        <SafeAreaView style={loginStyles.root}>
            {isLoading && <Loader />}
            <View style={loginStyles.container}>
                <View style={loginStyles.form}>
                    <InputCustom name='email' label='Email' required errMsg={errForm.email}
                        value={formValue.email} onChange={(value) => handleChangeValueForm('email',value)}
                        disabled={user.role === 'employee'}
                    />
                    <InputCustom name='name' label='Name' required errMsg={errForm.name}
                        value={formValue.name} onChange={(value) => handleChangeValueForm('name',value)}
                        disabled={user.role === 'employee'}
                    />
                    {user.role !== 'employee' ? (
                        <TouchableOpacity style={profileStyle.btn} onPress={handleResetPassword}>
                            <Ionicons 
                                size={25}
                                color={color.primary}
                                name="sync-circle-outline"
                            />
                            <Text>Reset Password</Text>
                        </TouchableOpacity>
                    ) : (
                        <BouncyCheckbox 
                            size={25}
                            fillColor={color.primary}
                            isChecked={changePWD}
                            unfillColor="#FFFFFF"
                            text="Change Password"
                            disableBuiltInState
                            textStyle={profileStyle.checkBoxText}
                            onPress={() => setChangePWD(!changePWD)}
                        />
                    )}
                    {changePWD && (
                        <>
                            <InputCustom name='Current-password' label='Current Password' placeholder='Current password'
                                value={formValue.currentPWD} onChange={(value) => handleChangeValueForm('currentPWD',value)}
                                required  type='password' errMsg={errForm.currentPWD}
                            />
                            <InputCustom name='password' label='Password' type='password' placeholder='Password'
                                value={formValue.password} onChange={(value) => handleChangeValueForm('password',value)}
                                required
                            />
                            <InputCustom name='Re-password' label='Confirm password' type='password' placeholder='Confirm password' errMsg={errForm.password}
                                value={formValue['Re-password']} onChange={(value) => handleChangeValueForm('Re-password',value)}
                                required
                            />
                        </>
                    )}
                    
                    <TouchableOpacity
                        style={{...loginStyles.button, ...loginStyles.alignCenter}} 
                        onPress={handleSubmitForm}>
                        <Text style={{ color: 'white' }}>
                            Update
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const profileStyle = StyleSheet.create({
    checkBoxText: {
        color: color.primary, 
        textDecorationLine: "none"
    },
    btn: {
        flexDirection: 'row',
        padding: 10,
        alignItems : 'center',
        gap: 10,
    }
})

export default ViewProfile;
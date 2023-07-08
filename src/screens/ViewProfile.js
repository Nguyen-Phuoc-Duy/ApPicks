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
import SelectDropdown from "../components/selectDropdown";
import roles from "../constant/listRole";

const ViewProfile = ({ navigation, route }) => {
    const { user, useFetch, setUser } = useContext(AuthContext);
    const [isLoading, setIsloading] = useState(false);
    const [changePWD, setChangePWD] = useState(false);
    const [profile, setProfile] = useState();
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

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
                let { info, adminUpdate = false } = route.params;
                setProfile(info);
                setIsAdmin(adminUpdate);
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
        if (user && user.role !== 'employee' && profile && !isAdmin) {
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
        } else {
            navigation.setOptions({
                headerRight: () => ''
            })
        }
    }, [profile, isAdmin])

    const handleChangeValueForm = (field,value) => {
        let newForm = {...formValue};
        newForm[field] = value;
        setFormValue(newForm);
        setErrForm({
            name: '',
            password: '',
            currentPWD: ''
        });
    }

    useEffect(() => {
        let { info } = route.params || {};
        if (info && (info.name !== formValue.name)) {
            setDisableSubmit(false);
        } else if (formValue.password && formValue.currentPWD) {
            setDisableSubmit(false);
        } else {
            setDisableSubmit(true);
        }
    }, [formValue])

    const handleResetPassword = async () => {
        if (!profile || !profile.ID) return;
        let confirm = await useAlert.alertSync('Reset Password', 'Are you sure you want to reset your password!');
        if (!confirm) return;

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
                let confirm = await useAlert.alertSync('Update Profile', "Are you sure you want to update profile!");
                if (!confirm) return;
                setIsloading(true);
                let result = await useFetch('users/updateProfile', { ID: profile.ID, name, password, currentPWD }, 'POST')
                if (result.errCode === 200) {
                    setChangePWD(false);
                    if (isAdmin) {
                        setUser(prev => {
                            prev.name = name;
                            return prev;
                        })
                    }
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

    const handleChangeRole = async (role) => {
        try {
            if (role !== profile?.role) {
                let confirm = await useAlert.alertSync('Update Role', `Are you sure you want to update the role to an ${role}!`);
                if (!confirm) return;
                setIsloading(true);
                let result = await useFetch('admin/updateUserRole', { ID: profile.ID, role }, 'POST')
                
                if (result.errCode === 200) {
                    setProfile(prev => {
                        prev.role = role;
                        return prev;
                    })
                }
                useAlert.alert('Update role', result.errMsg);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsloading(false);
        }
    }

    return (
        <SafeAreaView style={loginStyles.root}>
            {isLoading && <Loader />}
            <View style={loginStyles.container}>
                <View style={loginStyles.form}>
                    <InputCustom name='email' label='Email'
                        value={profile?.email} disabled
                    />
                    <InputCustom name='name' label='Name' required errMsg={errForm.name}
                        value={formValue.name} onChange={(value) => handleChangeValueForm('name',value)}
                        disabled={user.role === 'employee'}
                    />
                    {!isAdmin && user.role !== 'employee' ? (
                        <View style={{flexDirection: 'row', zIndex: 10}}>
                            <SelectDropdown options={roles.map(r => ({label: r, value: r}))} 
                            onChange={handleChangeRole}
                            placement="center" value={profile?.role}>
                                <Ionicons 
                                    size={25}
                                    color={color.primary}
                                    name="sync-circle-outline"
                                />
                                <Text style={{textTransform: 'capitalize'}}>{profile?.role}</Text>
                            </SelectDropdown>
                            <TouchableOpacity style={profileStyle.btn} onPress={handleResetPassword}>
                                <Ionicons 
                                    size={25}
                                    color={color.primary}
                                    name="sync-circle-outline"
                                />
                                <Text>Reset Password</Text>
                            </TouchableOpacity>
                        </View>
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
                        disabled={disableSubmit}
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
    },
    grBtn: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default ViewProfile;
import { SafeAreaView, TextInput, View, Text, TouchableOpacity } from "react-native";
import { useContext, useState } from "react"
import { AuthContext } from "../context/authProvider"
import loginStyles from "../css/login";
import useAlert from '../hook/useAlert';
import Loader from "../components/loader";
import InputCustom from "../components/inputCustom";
import { Button } from "react-native";

const AccountInfo = ({ navigation }) => {
    const { user, useFetch, setUser } = useContext(AuthContext);
    const [isLoading, setIsloading] = useState(false);
    const [changePWD, setChangePWD] = useState(false);
    const [formValue,setFormValue] = useState({
        name: user?.name || '',
        currentPWD: '',
        password: '',
        'Re-password': ''
    });
    const [errForm, setErrForm] = useState({
        name: '',
        password: '',
        currentPWD: ''
    })

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
                    setUser(prev => {
                        if(prev){
                            prev.name = name;
                        }
                        return prev;
                    });
                    setFormValue({...formValue, password: '', ['Re-password']: '', currentPWD: ''})
                    useAlert.alert('Update user', 'User updated successfully!');
                } else if (result.errCode === 400) {
                    setErrForm({
                        ...errForm,
                        currentPWD: result.errMsg || 'Forbidden!'
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

    return (
        <SafeAreaView style={loginStyles.root}>
            {isLoading && <Loader />}
            <View style={loginStyles.container}>
                <View style={loginStyles.form}>
                    <TextInput editable={false} style={loginStyles.inputDisabled} value={user?.email || 'Invalid mail!'} />
                    <InputCustom name='name' label='Name' required errMsg={errForm.name}
                        value={formValue.name} onChange={(value) => handleChangeValueForm('name',value)}
                    />
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

export default AccountInfo;
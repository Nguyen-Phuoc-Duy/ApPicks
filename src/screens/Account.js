import { SafeAreaView, TextInput, View, Text, TouchableOpacity } from "react-native";
import { useContext, useState } from "react"
import { AuthContext } from "../context/authProvider"
import loginStyles from "../css/login";
import useAlert from '../hook/useAlert';
import Loader from "../components/loader";

const AccountInfo = ({ navigation }) => {
    const { user, useFetch, setUser } = useContext(AuthContext);
    const [isLoading, setIsloading] = useState(false);
    const [formValue,setFormValue] = useState({
        name: user?.name || '',
        password: '',
        'Re-password': ''
    });
    const [errForm, setErrForm] = useState({
        name: '',
        password: ''
    })

    const handleChangeValueForm = (field,value) => {
        let newForm = {...formValue};
        newForm[field] = value;
        setFormValue(newForm);
    }
    
    const handleSubmitForm = async () => {
        try {
            let { name, password } = formValue;
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
                let result = await useFetch('users/updateProfile', { ID: user.ID, name, password }, 'POST')
                if (result.errCode === 200) {
                    setUser(prev => {
                        if(prev){
                            prev.name = name;
                        }
                        return prev;
                    });
                    setFormValue({...formValue, password: '', ['Re-password']: ''})
                    useAlert.alert('Update user', 'User updated successfully!');
                }else {
                    console.log(result);
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
                    <TextInput style={loginStyles.input} placeholder='Name*'
                        value={formValue.name}
                        onChangeText={(value) => handleChangeValueForm('name',value)} />
                    <TextInput style={loginStyles.input} placeholder='Password*' autoCompleteType="password" 
                        secureTextEntry autoCorrect={false} value={formValue.password}
                        onChangeText={(value) => handleChangeValueForm('password',value)}
                    />
                    <TextInput style={loginStyles.input} placeholder='Confirm password' secureTextEntry autoCorrect={false} value={formValue['Re-password']}
                        onChangeText={(value) => handleChangeValueForm('Re-password',value)} />
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
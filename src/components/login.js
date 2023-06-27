import { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TextLin, Button, TouchableOpacity } from 'react-native';
import loginStyles from '../css/login';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../context/authProvider';
import Loader from './loader';

const Login = ({ navigation }) => {
    const [formData,setFormData] = useState({});
    const [action,setAction] = useState('login');
    const [isLoading,setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState({
        email: '',
        password: '',
        form: ''
    })
    const { user, setUser, setToken, token, useFetch } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            if (!token) {
                setToken(user.token);
            }
            navigation.navigate('HomeScreen');
        }
    },[user])

    const handleChangeValueForm = (field,value) => {
        if(!field) return;

        let newFormData = formData;
        setErrMsg({
            email: '',
            password: '',
            form: ''
        })
        newFormData[field] = value || '';
        setFormData(newFormData)
    }

    const handleSubmitForm = async () => {
        try {
            setIsLoading(true);
            let { email, name, password } = formData;
            if (!email || !password) {
                setErrMsg({
                    ...errMsg,
                    form: 'Email and pasword is required!'
                })
                return;
            }
            let data;
            let url;
            switch (action) {
                case 'login':
                    data = {
                        email,
                        password
                    }
                    url = 'users/login'
                    break;
                case 'register':
                    if(password !== formData['Re-password']) {
                        setErrMsg({
                            ...errMsg,
                            password: 'Confirm password is not match!'
                        })
                    }else if(!name) {
                        setErrMsg({
                            ...errMsg,
                            form: 'Name is required!'
                        })
                    }else {
                        data = {
                            email,
                            name,
                            password
                        }
                        url = 'users/register'
                    }
                    break;
                default: 
                    break;
            }
            if(data) {
                setErrMsg({
                    email: '',
                    password: '',
                    form: ''
                })
                const result = await useFetch(url, data, 'POST');
                if(result.errCode === 200){
                    let user = result.data;
                    setUser(user);
                    setToken(user.token);
                    await SecureStore.setItemAsync('user', JSON.stringify(user));
                    await SecureStore.setItemAsync('token', user.token)
                    navigation.navigate('HomeScreen');
                }else {
                    setErrMsg({
                        email: '',
                        password: '',
                        form: result.errMsg || "Submit Failed!",
                    })
                }
            }
        } catch(e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
            <View style={loginStyles.root}>
                {isLoading && <Loader />}
                <View style={loginStyles.container}>
                    <Text style={loginStyles.title}>{action}</Text>
                    <View style={loginStyles.form}>
                        <TextInput style={loginStyles.input} placeholder='Email*' autoCompleteType="email"
                        onChangeText={(value) => handleChangeValueForm('email',value)} />
                        {errMsg.email && (
                            <Text style={loginStyles.textError}>
                                {errMsg.email}
                            </Text>
                        )}
                        {action === 'register' && (
                            <TextInput style={loginStyles.input} placeholder='Name*'
                            onChangeText={(value) => handleChangeValueForm('name',value)} />
                        )}
                        <TextInput style={loginStyles.input} placeholder='Password*' autoCompleteType="password" 
                        secureTextEntry autoCorrect={false} 
                        onChangeText={(value) => handleChangeValueForm('password',value)}
                        />
                        {action === 'register' && (
                            <>
                                <TextInput style={loginStyles.input} placeholder='Confirm password' secureTextEntry autoCorrect={false}
                                onChangeText={(value) => handleChangeValueForm('Re-password',value)} />
                                {errMsg.password && (
                                    <Text style={loginStyles.textError}>
                                        {errMsg.password}
                                    </Text>
                                )}
                            </>
                        )}
                        {errMsg.form && (
                            <Text style={loginStyles.textError}>
                                {errMsg.form}
                            </Text>
                        )}
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row'}}>
                            {action === 'login' ? (
                                <TouchableOpacity onPress={() => setAction('register')}>
                                    <Text style={loginStyles.textLink}>
                                        Sign up
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => setAction('login')}>
                                    <Text style={loginStyles.textLink}>
                                        Sign in
                                    </Text>
                                </TouchableOpacity>
                            )}
                            {action === 'login' && (
                                <TouchableOpacity>
                                    <Text style={loginStyles.textLink}>
                                        Forgot password?
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        <TouchableOpacity
                        style={{...loginStyles.button, ...loginStyles.alignCenter}} 
                        onPress={handleSubmitForm}>
                            <Text style={{ color: 'white' }}>
                                Submit
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    )
}
export default Login;
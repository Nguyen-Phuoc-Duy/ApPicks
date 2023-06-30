import { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TextLin, Button, TouchableOpacity } from 'react-native';
import loginStyles from '../css/login';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../context/authProvider';
import Loader from './loader';
import InputCustom from './inputCustom';
import color from '../constant/colorVariable';

const Login = (props) => {
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
            props.navigation.navigate('HomeScreen');
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
                    await SecureStore.setItemAsync('token', user.token);
                    setFormData({})
                    props.navigation.navigate('HomeScreen');
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
                        <InputCustom name='email' placeholder='Email' type='email' label='Email'
                            onChange={(value) => handleChangeValueForm('email',value)}
                            errMsg={errMsg.email} required
                        />
                        {action === 'register' && (
                            <InputCustom placeholder='Name' name='name' label='Name'
                                onChange={(value) => handleChangeValueForm('name',value)}
                                required
                            />
                        )}
                        <InputCustom name='password' placeholder='Password' label='Password' 
                            onChange={(value) => handleChangeValueForm('password',value)}
                            required type='password'
                        />
                        {action === 'register' && (
                            <InputCustom name='Re-password'  placeholder='Confirm password' label='Confirm password'
                                onChange={(value) => handleChangeValueForm('Re-password',value)}
                                required errMsg={errMsg.password} type='password'
                            />
                        )}
                        {errMsg.form && (
                            <Text style={labelErr}>
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


let labelErr = {
    textTransform: 'capitalize',
    fontSize: 12,
    marginVertical: 5,
    color: color.danger
}

export default Login;
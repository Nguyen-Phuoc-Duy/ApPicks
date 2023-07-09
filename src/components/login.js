import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import loginStyles from '../css/login';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../context/authProvider';
import Loader from './loader';
import InputCustom from './inputCustom';
import color from '../constant/colorVariable';

const Login = ({ navigation }) => {
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState({
        email: '',
        password: '',
        form: ''
    })
    const { user, setUser, setToken, useFetch, setNavigationApp } = useContext(AuthContext);

    useLayoutEffect(() => {
        if (user) {
            navigation.navigate('HomeScreen');
        }
    }, [user])

  useEffect(() => {
    setNavigationApp(navigation);
  }, []);

    const handleChangeValueForm = (field, value) => {
        if (!field) return;
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
            let { email, password } = formData;
            if (!email || !password) {
                setErrMsg({
                    ...errMsg,
                    form: 'Email and pasword is required!'
                })
                return;
            }
            let data = {
                email,
                password
            };
            setErrMsg({
                email: '',
                password: '',
                form: ''
            })
            const result = await useFetch('users/login', data, 'POST');
            if (result?.errCode === 200) {
                let user = result.data;
                setUser(user);
                setToken(user.token);
                await SecureStore.setItemAsync('token', user.token);
                setFormData({})
                navigation.navigate('HomeScreen');
            }else {
                setErrMsg({
                  email: '',
                    password: '',
                    form: result.errMsg || "Submit Failed!",
                })
            }
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
      }

    return (
        <View style={loginStyles.root}>
            {isLoading && <Loader />}
            <View style={loginStyles.container}>
                <Text style={loginStyles.title}>Login</Text>
                <View style={loginStyles.form}>
                    <InputCustom name='email' placeholder='Email' type='email' label='Email'
                        onChange={(value) => handleChangeValueForm('email', value)}
                        errMsg={errMsg.email} required value={formData['email']}
                    />
                    <InputCustom name='password' placeholder='Password' label='Password'
                        onChange={(value) => handleChangeValueForm('password', value)}
                        required type='password' value={formData['password']}
                    />
                    {errMsg.form && (
                        <Text style={labelErr}>
                            {errMsg.form}
                        </Text>
                    )}
                    <TouchableOpacity
                        style={{ ...loginStyles.button, ...loginStyles.alignCenter }}
                        onPress={handleSubmitForm}>
                        <Text style={{ color: 'white' }}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
  );
};

let labelErr = {
  textTransform: "capitalize",
  fontSize: 12,
  marginVertical: 5,
  color: color.danger,
};

export default Login;

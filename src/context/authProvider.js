import { createContext, useState, useCallback, useLayoutEffect } from 'react';
import Loader from '../components/loader';
import axios from 'axios';
import { Platform } from 'react-native';
import { REACT_APP_HOST_IOS, REACT_APP_HOST_ANDROID } from "@env"
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [navigationApp, setNavigationApp] = useState();

    const [isloading, setIsLoading] = useState(false);

    useLayoutEffect(() => {
        const checkLogin = async () => {
            let user = await SecureStore.getItemAsync('user');
            if (user){
                try {
                    user = JSON.parse(user);
                    setUser(user);
                    setToken(user.token);
                    await SecureStore.setItemAsync('token', user.token)
                }catch(e) {
                    console.log(e);
                } finally {
                    setIsLoading(false);
                }
            }
        }
        checkLogin();
    },[])

    const useFetch = useCallback(async (url, data, method = 'GET', headers = {}) => {
        try {
            let token = token || user?.token || await SecureStore.getItemAsync('token') || ''
            let setHeaders = {
                'Content-Type': 'application/json',
                ...headers,
                authorization: 'Bearer ' + token
            }
            url = (Platform.OS === 'ios' ? REACT_APP_HOST_IOS : REACT_APP_HOST_ANDROID) + url;
            let result;
            switch (method) {
                case 'GET':
                case "DELETE":
                    result = await axios({
                        method,
                        url,
                        headers: setHeaders,
                    });
                    result = result.data;
                    break;
                case 'POST':
                    result = await axios.post(url, data,{
                        headers: setHeaders
                    });
                    result = result.data;
                    break;
                default:
                    result = {
                        errCode: 500,
                        errMsg: 'Method not supported!'
                    };
                    break;
            }
            if([400, 401].includes(result?.errCode)){
                navigationApp?.navigate('Login')
                return result;
            } else {
                return result;
            }
        } catch (err) {
            console.log('useFetch:',err);
            return 'System Error!';
        }
    },[user, token])

    const logOut = async (navigate) => {
        try {
            setIsLoading(true);
            await SecureStore.deleteItemAsync('user');
            await SecureStore.deleteItemAsync('token');
            setUser(null);
            setToken(null);
            navigate('Login');
        }finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider 
            value={{
                user,
                setUser,
                token,
                setToken,
                useFetch,
                logOut,
                navigationApp,
                setNavigationApp
            }}
        >
        {isloading && <Loader />}
        {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
import { createContext, useState, useCallback, useLayoutEffect } from 'react';
import Loader from '../components/loader';
import axios from 'axios';
import { Platform } from 'react-native';
import { REACT_APP_HOST_IOS, REACT_APP_HOST_ANDROID } from "@env"
import * as SecureStore from 'expo-secure-store';
import useAlert from '../hook/useAlert';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [navigationApp, setNavigationApp] = useState();

    const [isloading, setIsLoading] = useState(false);

    const loginWithToken = async () => {
        setIsLoading(true);
        let accessToken = await SecureStore.getItemAsync('token');
        if (accessToken) {
            try {
                let result = await useFetch('users/loginWithToken/' + accessToken);
                if (result.errCode === 200) {
                    setUser(result.data);
                    setToken(accessToken);
                }
            }catch(e) {
                console.log(e);
            }
        }
        setIsLoading(false);
    }

    useLayoutEffect(() => {
        loginWithToken();
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
            if(result?.errCode === 400){
                await useAlert.alertSync('Forbidden', result.errMsg, '')
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
            await SecureStore.deleteItemAsync('token');
            setUser(null);
            setToken(null);
            navigate('Login');
        } finally {
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
        {isloading ? <Loader /> : children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
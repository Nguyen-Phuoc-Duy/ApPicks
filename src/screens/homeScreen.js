import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import Tables from './table';
import { Ionicons } from '@expo/vector-icons';
import AccountInfo from './Account';
import styles from '../css/style';
import { useContext, useLayoutEffect } from 'react';
import { AuthContext } from '../context/authProvider';
import useAlert from '../hook/useAlert';

const HomeScreen = ({ navigation }) => {

    const Tab = createBottomTabNavigator();

    const { logOut, user } = useContext(AuthContext);
    
    useLayoutEffect(() => {
        if (!user) {
            navigation.navigate('Login');
        }
    },[])

    const HandleLogout = async (navigate) => {
        if(!navigate) return null;
        let confirm = await useAlert.alertSync('Logout', 'Are you sure you want to log out?');
        confirm && logOut(navigate);
    }

    return (
        <Tab.Navigator initialRouteName='View Table'>
            <Tab.Screen 
                name="Logout"
                component={HandleLogout}
                options={{
                    headerTintColor: "#644AB5",
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerLeft: () => '',
                    tabBarLabelStyle: { display: 'none' },
                    tabBarIcon: () => (
                        <TouchableOpacity style={styles.btnIcon}
                        onPress={() => HandleLogout(navigation.navigate)}
                        >
                            <Ionicons
                                name="exit-outline"
                                size={30}
                                color={"#644AB5"}
                                style={styles.btnLogout}
                                />
                        </TouchableOpacity>
                    )
                }}
            />
            <Tab.Screen 
                name="View Table"
                component={Tables}
                options={{
                    headerTintColor: "#644AB5",
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerLeft: () => '',
                    tabBarLabelStyle: { display: 'none' },
                    tabBarIcon: ({ color, size }) => (
                        <>
                          <Ionicons
                            name="grid-outline"
                            size={25}
                            color={"#644AB5"}
                          />
                        </>
                      )
                }}
            />
            <Tab.Screen 
                name="Account"
                component={AccountInfo}
                options={{
                    headerTitle: "Account",
                    headerTintColor: "#644AB5",
                    headerShown: true,
                    headerTitleAlign: 'center',
                    tabBarLabelStyle: { display: 'none' },
                    tabBarIcon: ({ color, size }) => (
                        <>
                        <Ionicons
                            name="person-circle-outline"
                            size={25}
                            color={"#644AB5"}
                        />
                        </>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default HomeScreen;


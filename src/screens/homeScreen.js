import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import Tables from './table';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import styles from '../css/style';
import { useContext } from 'react';
import { AuthContext } from '../context/authProvider';
import useAlert from '../hook/useAlert';
import Revenue from './revenue';
import color from '../constant/colorVariable';
import Users from './Users';
import Menu from './menu';
import React, { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
    const Tab = createBottomTabNavigator();

    const { logOut, user } = useContext(AuthContext);

    const HandleLogout = async (navigate) => {
        if (!navigate) return null;
        let confirm = await useAlert.alertSync('Logout', 'Are you sure you want to log out?');
        confirm && logOut(navigate);
    }

    return (
        <Tab.Navigator initialRouteName='View Table'>
            <Tab.Screen
                name="Logout"
                component={HandleLogout}
                options={{
                    headerTintColor: color.primary,
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
                                color={color.danger}
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
                    headerTintColor: color.primary,
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerLeft: () => '',
                    tabBarLabelStyle: { display: 'none' },
                    tabBarIcon: () => (
                        <>
                            <Ionicons
                                name="grid-outline"
                                size={25}
                                color={color.primary}
                            />
                        </>
                    )
                }}
            />
            {user && ['admin', 'manager'].includes(user.role) ? (
                <>
                    <Tab.Screen
                        name="Revenue"
                        component={Revenue}
                        options={{
                            headerTintColor: color.primary,
                            headerShown: true,
                            headerTitleAlign: 'center',
                            headerLeft: () => '',
                            tabBarLabelStyle: { display: 'none' },
                            tabBarIcon: () => (
                                <Ionicons
                                    name="cash-outline"
                                    size={25}
                                    color={color.primary}
                                />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Menu"
                        component={Menu}
                        options={{
                            headerTintColor: color.primary,
                            headerShown: true,
                            headerTitleAlign: 'center',
                            tabBarLabelStyle: { display: 'none' },
                            tabBarIcon: () => (
                                <>
                                    <MaterialIcons
                                        name="restaurant-menu"
                                        size={25}
                                        color={color.primary}
                                    />
                                </>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Users"
                        component={Users}
                        options={{
                            headerTintColor: color.primary,
                            headerShown: true,
                            headerTitleAlign: 'center',
                            tabBarLabelStyle: { display: 'none' },
                            tabBarIcon: () => (
                                <>
                                    <Ionicons
                                        name="people-outline"
                                        size={25}
                                        color={color.primary}
                                    />
                                </>
                            ),
                        }}
                    />
                </>
            ) : (
                <Tab.Screen
                    name="ViewUser"
                    component={HandleLogout}
                    options={{
                        headerTintColor: color.primary,
                        headerShown: true,
                        headerTitleAlign: 'center',
                        tabBarLabelStyle: { display: 'none' },
                        tabBarIcon: () => (
                            <TouchableOpacity style={styles.btnIcon}
                                onPress={() => navigation.navigate({
                                    name: 'ViewProfile',
                                    params: { info: user }
                                })}
                            >
                                <Ionicons
                                    name="person-circle-outline"
                                    size={30}
                                    color={color.primary}
                                />
                            </TouchableOpacity>
                        ),
                    }}
                />
            )}
        </Tab.Navigator>
    )
}

export default HomeScreen;

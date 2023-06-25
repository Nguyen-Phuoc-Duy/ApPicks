import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../components/login";
import AddTable from "../screens/addTable";
import Tables from "../screens/table";
import DetailTable from "../screens/detailTable";
import DetailOrder from "../screens/detailOrder";
import { TouchableOpacity, Text } from "react-native";
import styles from "../css/style";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../context/authProvider";

function Home() {
    const Stack = createNativeStackNavigator();

    const { logOut } = useContext(AuthContext);

    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Add Table"
                    component={AddTable}
                    options={{
                        headerTintColor: "#644AB5",
                        headerShown: true,
                        // tabBarIcon: ({ color, size }) => (
                        //   <>
                        //     <Ionicons
                        //       name="ios-add-circle-outline"
                        //       size={30}
                        //       color={"#644AB5"}
                        //     />
                        //   </>
                        // ),
                    }}
                />
                    <Stack.Screen
                        name="Tables"
                        component={Tables}
                        options={({ navigation }) => ({
                            headerTintColor: "#644AB5",
                            headerShown: true,
                            headerTitleAlign: 'center',
                            headerRight: () => (
                                <TouchableOpacity style={styles.btnIcon}
                                    onPress={() => navigation.navigate("Add Table")}>
                                    <Ionicons
                                        name="ios-add-circle-outline"
                                        size={30}
                                        color={"#644AB5"}
                                        style={styles.addIcon}
                                    />
                                </TouchableOpacity>
                            ),
                            headerLeft: () => (
                                <TouchableOpacity style={styles.btnIcon}
                                    onPress={() => logOut(navigation.navigate)}>
                                    <Ionicons
                                        name="exit-outline"
                                        size={30}
                                        color={"#644AB5"}
                                        style={styles.btnLogout}
                                    />
                                </TouchableOpacity>
                            )
                        })}
                    />
                    <Stack.Screen
                        name="Detail Table"
                        component={DetailTable}
                        options={{
                            headerTitleAlign: "center",
                            headerTintColor: "#644AB5",
                            headerShown: true
                        }}
                    />
                    <Stack.Screen
                        name="Detail Order"
                        component={DetailOrder}
                        options={{
                            headerTitleAlign: "center",
                            headerTintColor: "#644AB5",
                            headerShown: true,
                            headerLeft: () => ''
                        }}
                    />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Home;

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
import HomeScreen from "../screens/homeScreen";

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
                    }}
                />
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{
                            headerShown: false,
                        }}
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

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../components/login";
import DetailTable from "../screens/detailTable";
import DetailOrder from "../screens/detailOrder";
import HomeScreen from "../screens/homeScreen";

function Home() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{
                        headerShown: false,
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

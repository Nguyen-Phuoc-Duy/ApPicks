import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../components/login";
import DetailTable from "../screens/detailTable";
import DetailOrder from "../screens/detailOrder";
import HomeScreen from "../screens/homeScreen";
import Revenue from "../screens/revenue";
import ViewDetailOrder from "../screens/viewDetailOrder";
import color from "../constant/colorVariable";

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
                        headerTintColor: color.primary,
                        headerShown: true
                    }}
                />
                <Stack.Screen
                    name="Detail Order"
                    component={DetailOrder}
                    options={{
                        headerTitleAlign: "center",
                        headerTintColor: color.primary,
                        headerShown: true,
                        headerLeft: () => ''
                    }}
                />
                <Stack.Screen
                    name="ViewDetailOrder"
                    component={ViewDetailOrder}
                    options={{
                        headerTitleAlign: "center",
                        headerTintColor: color.primary,
                        headerShown: true
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Home;

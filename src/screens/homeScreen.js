import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import Tables from "./table";
import { Ionicons } from "@expo/vector-icons";
import AccountInfo from "./Account";
import styles from "../css/style";
import { useContext, useLayoutEffect } from "react";
import { AuthContext } from "../context/authProvider";
import useAlert from "../hook/useAlert";
import Revenue from "./revenue";
import { MaterialIcons } from "@expo/vector-icons";
import Menu from "./menu";
import color from "../constant/colorVariable";

const HomeScreen = ({ navigation }) => {
  const Tab = createBottomTabNavigator();

  const { logOut, user } = useContext(AuthContext);

  useLayoutEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, []);

  const HandleLogout = async (navigate) => {
    if (!navigate) return null;
    let confirm = await useAlert.alertSync(
      "Logout",
      "Are you sure you want to log out?"
    );
    confirm && logOut(navigate);
  };

  const RenderTableComponent = (props) => {
    return <Tables navigationParent={navigation} {...props} />;
  };

  return (
    <Tab.Navigator initialRouteName="View Table">
      <Tab.Screen
        name="Logout"
        component={HandleLogout}
        options={{
          headerTintColor: color.primary,
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => "",
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: () => (
            <TouchableOpacity
              style={styles.btnIcon}
              onPress={() => HandleLogout(navigation.navigate)}
            >
              <Ionicons
                name="exit-outline"
                size={30}
                color={color.danger}
                style={styles.btnLogout}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="View Table"
        component={RenderTableComponent}
        options={{
          headerTintColor: color.primary,
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => "",
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: () => (
            <>
              <Ionicons name="grid-outline" size={25} color={color.primary} />
            </>
          ),
        }}
      />
      {user && ["admin", "manager"].includes(user.role) && (
        <Tab.Screen
          name="Revenue"
          component={Revenue}
          options={{
            headerTintColor: color.primary,
            headerShown: true,
            headerTitleAlign: "center",
            headerLeft: () => "",
            tabBarLabelStyle: { display: "none" },
            tabBarIcon: () => (
              <Ionicons name="cash-outline" size={25} color={color.primary} />
            ),
          }}
        />
      )}
      {user && ["admin", "manager"].includes(user.role) && (
        <Tab.Screen
          name="Menu"
          component={Menu}
          options={{
            headerTintColor: color.primary,
            headerShown: true,
            headerTitleAlign: "center",
            headerLeft: () => "",
            tabBarLabelStyle: { display: "none" },
            tabBarIcon: () => (
              <MaterialIcons
                name="restaurant-menu"
                size={25}
                color={color.primary}
              />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="Account"
        component={AccountInfo}
        options={{
          headerTitle: "Account",
          headerTintColor: color.primary,
          headerShown: true,
          headerTitleAlign: "center",
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: () => (
            <>
              <Ionicons
                name="person-circle-outline"
                size={25}
                color={color.primary}
              />
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/Ionicons";
import Menu from "../screens/menu";
import DetailTable from "../screens/detailTable";
import Tables from "../screens/table";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AddMenu from "../screens/addMenu";
import EditMenu from "../screens/editMenu";
import DeleteMenu from "../screens/deleteMenu";
import Revenue from "../screens/revenue";
function Layout() {
  const Tab = createBottomTabNavigator();
  return (
    <>
      {/* <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerStyle: {
            backgroundColor: "#644AB5",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
          },
          tabBarStyle: { backgroundColor: "#fff" },

          tabBarActiveTintColor: "#644AB5",
        }}
      >
        <Tab.Screen
          name="Menu"
          component={Menu}
          options={{
            tabBarLabel: "",
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              // <Icon name="menu" size={size} color={color} />
              <AntDesign name="profile" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Tables"
          component={Tables}
          options={{
            tabBarLabel: "",
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="table" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Detail Table"
          component={DetailTable}
          options={{
            tabBarLabel: "",
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="exception1" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator> */}
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerStyle: {
            backgroundColor: "#644AB5",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
          },
          tabBarStyle: { backgroundColor: "#fff" },

          tabBarActiveTintColor: "#644AB5",
        }}
      >
        <Tab.Screen
          name="Add Menu"
          component={AddMenu}
          options={{
            tabBarLabel: "",
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="ios-add-circle-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Edit Menu"
          component={EditMenu}
          options={{
            tabBarLabel: "",
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="edit" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Delate Menu"
          component={DeleteMenu}
          options={{
            tabBarLabel: "",
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="delete" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Revenue"
          component={Revenue}
          options={{
            tabBarLabel: "",
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="pay-circle-o1" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default Layout;

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/Ionicons";
import DetailOrder from "../screens/detailOrder";
import DetailTable from "../screens/detailTable";
import Tables from "../screens/table";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import MenuAdmin from "../screens/menuAdmin";
import Revenue from "../screens/revenue";
import React, { useState } from "react";
import styles from "../css/style";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import {
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";
function Layout() {
  const Tab = createBottomTabNavigator();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
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
              <AntDesign name="profile" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Detail Order"
          component={DetailOrder}
          options={{
            tabBarLabel: "",
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="exception1" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      {/* ///// */}
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
          name="Menu(Admin)"
          component={MenuAdmin}
          options={{
            tabBarLabel: "",
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <>
                <AntDesign name="profile" size={size} color={color} />
              </>
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
      </Tab.Navigator> */}
    </>
  );
}

export default Layout;

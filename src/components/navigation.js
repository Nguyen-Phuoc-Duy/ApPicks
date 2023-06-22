import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Layout from "./layout";
import DetailOrder from "../screens/detailOrder";
import DetailTable from "../screens/detailTable";
import { Ionicons } from "@expo/vector-icons";
import AddTable from "../screens/addTable";
import Menu from "../screens/menu";
import Tables from "../screens/table";
import styles from "../css/style";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";
function BaseLink() {
  // const Stack = createNativeStackNavigator();
  const Stack = createBottomTabNavigator();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator
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
        {/* <Stack.Screen
          name="Layout"
          component={Layout}
          options={{
            headerShown: false,
          }}
        /> */}
        <>
          <Stack.Screen
            name="Add Table"
            component={AddTable}
            options={{
              tabBarLabel: "",
              headerShown: true,
              tabBarIcon: ({ color, size }) => (
                <>
                  <Ionicons
                    name="ios-add-circle-outline"
                    size={30}
                    color={"#644AB5"}
                  />
                </>
              ),
            }}
          />
          <Stack.Screen
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
          <Stack.Screen
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
          <Stack.Screen
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
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{
              tabBarLabel: "",
              headerShown: true,
              showLabel: false,
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="exception1" size={size} color={color} />
              ),
            }}
          />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default BaseLink;

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "@expo/vector-icons/Ionicons";
import Menu from "../screens/menu";
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
      {/* ///// */}
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
      </Tab.Navigator>
    </>
  );
}

export default Layout;
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   modalView: {
//     marginVertical: 100,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//     display: "flex",
//     alignItems: "center",
//     alignContent: "center",
//   },
//   buttonClose: {
//     backgroundColor: "#2196F3",
//     marginLeft: 180,
//     display: "flex",
//     alignItems: "center",
//     width: 40,
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   container: {
//     flex: 1,
//   },
//   inner: {
//     padding: 24,
//     flex: 1,
//   },
//   header: {
//     fontSize: 36,
//     marginBottom: 48,
//   },
//   textInput: {
//     height: 40,
//     borderColor: "#000000",
//     borderBottomWidth: 1,
//     marginBottom: 36,
//   },
//   btnContainer: {
//     backgroundColor: "white",
//     marginTop: 12,
//   },
//   title_exit: {
//     display: "flex",
//     flexDirection: "row",
//   },
// });

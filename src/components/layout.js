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
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
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
          name="Add Menu"
          component={AddMenu}
          options={{
            tabBarLabel: "",
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>Hello World!</Text>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.textStyle}>Hide Modal</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
                <Pressable
                  // style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Ionicons
                    name="ios-add-circle-outline"
                    size={size}
                    color={color}
                  />
                </Pressable>
              </View>
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
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

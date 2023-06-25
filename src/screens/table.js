import { StyleSheet, Text, View, Pressable, Modal, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import styles from "../css/style";
import {
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";
import { AuthContext } from "../context/authProvider";
import ModalAddTable from "../components/modal/addTable";
const Tables = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tables,setTables] = useState([]);
  
  const { useFetch } = useContext(AuthContext);
  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.btnIcon}
            onPress={() => setModalVisible(true)}>
            <Ionicons
                name="ios-add-circle-outline"
                size={30}
                color={"#644AB5"}
                style={styles.addIcon}
            />
        </TouchableOpacity>
    ),
    })
  },[]);

  useEffect(() => {
    getTables();
  },[route.params?.reload])

  const getTables = async () => {
    let result = await useFetch('tables/getAll')
    if(result.errCode === 200) {
      setTables(result.data)
    }else if ([400,401].includes(result?.errCode)){
      navigation.navigate('Login');
    }
  }

  return (
    <ScrollView>
      {tables && tables.map(table => (
          <TouchableOpacity key={table.ID}
            onPress={() => navigation.navigate('Detail Table', { ID: table.ID })}
            style={styles.boxTable}
          >
            <View key={table.ID} style={styles.containerRow}>
              <Text style={styles.textTable}>{table.name}</Text>
              <View style={{ flexDirection: 'row', gap: 10}}>
                <TouchableOpacity>
                  <Ionicons 
                    name="create-outline"
                    size={30}
                    color={"#644AB5"}
                    style={styles.addIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons 
                    name="trash-outline"
                    size={30}
                    color={"#644AB5"}
                    style={styles.addIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
      ))}
      {modalVisible && (
        <ModalAddTable setModalVisible={setModalVisible} onAdd={setTables} />
      )}
    </ScrollView>
  );
};

export default Tables;


{/* <Modal
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
              <Pressable>
                <Pressable style={styles.title_exit}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>X</Text>
                  </Pressable>
                </Pressable>
                <Pressable>
                  <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                  >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <View style={styles.inner}>
                        <Text style={styles.header}>Order 1</Text>
                        <Text>Bia</Text>
                        <Text>20000/chai</Text>
                        <View style={styles.btnContainer}>
                          <Button title="Thêm" onPress={() => null} />
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </KeyboardAvoidingView>
                </Pressable>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.addIconContainer}
        >
          <Ionicons
            name="ios-add-circle-outline"
            size={30}
            color={"#644AB5"}
            style={styles.addIcon}
          />
        </Pressable> */}
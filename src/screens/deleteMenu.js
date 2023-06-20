import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";
import styles from "../css/style";
const DeleteMenu = () => {
  const [modalVisible2, setModalVisible2] = useState(false);
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles.centeredView2}>
          <View style={styles.modalView2}>
            <Pressable>
              <Pressable style={styles.title_exit}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible2(!modalVisible2)}
                >
                  <Text style={styles.textStyle}>X</Text>
                </Pressable>
              </Pressable>
              <Pressable>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={styles.container2}
                >
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner2}>
                      <Text style={styles.header}>Xoá món</Text>
                      <Text style={styles.textDel}>
                        Bạn có chắc chắn muốn xoá món này khổng ??
                      </Text>
                      <View style={styles.btnContainer}>
                        <Button title="Xoá" onPress={() => null} />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
              </Pressable>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible2(!modalVisible2)}>
        <AntDesign name="delete" size={24} color={"#644AB5"} />
      </Pressable>
    </>
  );
};

export default DeleteMenu;

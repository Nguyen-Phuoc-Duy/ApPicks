import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import styles from "../css/style";
import {
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";
const AddMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
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
                      <Text style={styles.header}>Sửa món</Text>
                      <TextInput placeholder="Tên" style={styles.textInput} />
                      <TextInput placeholder="Giá" style={styles.textInput} />
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
      </Pressable>
    </>
  );
};

export default AddMenu;

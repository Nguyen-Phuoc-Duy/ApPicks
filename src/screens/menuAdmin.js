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
const MenuAdmin = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  return (
    <ScrollView>
      <View style={styles.box}>
        <View style={styles.boxLeft}>
          <Text style={styles.text1}>Bia</Text>
          <Text style={styles.text2}>20000/chai</Text>
        </View>
        <View style={styles.boxRight}>
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
                          <Text style={styles.header}>Thêm món</Text>
                          <TextInput
                            placeholder="Tên"
                            style={styles.textInput}
                          />
                          <TextInput
                            placeholder="Giá"
                            style={styles.textInput}
                          />
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
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Ionicons
              name="ios-add-circle-outline"
              size={24}
              color={"#644AB5"}
            />
          </Pressable>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible1}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible1(!modalVisible1);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable>
                  <Pressable style={styles.title_exit}>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible1(!modalVisible1)}
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
                          <TextInput
                            placeholder="Tên"
                            style={styles.textInput}
                          />
                          <TextInput
                            placeholder="Giá"
                            style={styles.textInput}
                          />
                          <View style={styles.btnContainer}>
                            <Button title="Sửa" onPress={() => null} />
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                  </Pressable>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable onPress={() => setModalVisible1(!modalVisible1)}>
            <AntDesign name="edit" size={24} color={"#644AB5"} />
          </Pressable>
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
                          {/* <TextInput
                            placeholder="Tên"
                            style={styles.textInput}
                          />
                          <TextInput
                            placeholder="Giá"
                            style={styles.textInput}
                          /> */}
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
        </View>
      </View>
    </ScrollView>
  );
};

export default MenuAdmin;

const styles = StyleSheet.create({
  textDel: {
    fontSize: 20,
  },
  box: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "#c3c3c3",
    height: 80,
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  text1: {
    color: "#644AB5",
    fontSize: 25,
    fontWeight: 700,
  },
  text2: {
    color: "#644AB5",
    fontSize: 20,
  },
  boxRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-evenly",
    flex: 1,
  },
  boxLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
    marginHorizontal: 50,
  },
  modalView: {
    marginVertical: 100,
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
  modalView2: {
    marginVertical: 100,
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
    display: "flex",
    alignItems: "center",
    alignContent: "center",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginLeft: 180,
    display: "flex",
    alignItems: "center",
    width: 40,
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
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    marginHorizontal: 20,
  },
  inner: {
    padding: 24,
    flex: 1,
  },
  inner2: {
    padding: 24,
    flex: 1,
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
  title_exit: {
    display: "flex",
    flexDirection: "row",
  },
});

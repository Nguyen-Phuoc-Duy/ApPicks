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
const EditMenu = () => {
    const [modalVisible1, setModalVisible1] = useState(false);
    return (
        <>
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
                                            <TextInput placeholder="Tên" style={styles.textInput} />
                                            <TextInput placeholder="Giá" style={styles.textInput} />
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
        </>
    );
};

export default EditMenu;

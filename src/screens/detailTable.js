import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import styles from "../css/style";
import { Entypo } from "@expo/vector-icons";
import SelectMultiple from "react-native-select-multiple";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import {
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";
const DetailTable = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState([]);

  const data = [
    { key: "1", value: "Apple", disabled: true },
    { key: "2", value: "Orange" },
    { key: "3", value: "Pears" },
    { key: "4", value: "Banana" },
    { key: "5", value: "Watermelon", disabled: true },
    { key: "6", value: "Coconut" },
    { key: "7", value: "Tomato" },
    { key: "8", value: "Kiwi" },
    { key: "1", value: "Apple", disabled: true },
    { key: "2", value: "Orange" },
    { key: "3", value: "Pears" },
    { key: "4", value: "Banana" },
    { key: "5", value: "Watermelon", disabled: true },
    { key: "6", value: "Coconut" },
    { key: "7", value: "Tomato" },
    { key: "8", value: "Kiwi" },
    { key: "1", value: "Apple", disabled: true },
    { key: "2", value: "Orange" },
    { key: "3", value: "Pears" },
    { key: "4", value: "Banana" },
    { key: "5", value: "Watermelon", disabled: true },
    { key: "6", value: "Coconut" },
    { key: "7", value: "Tomato" },
    { key: "8", value: "Kiwi" },
  ];
  return (
    <>
      <ScrollView>
        <View style={styles.boxTable}>
          <Text style={styles.textTable}>Order 1</Text>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View>
              <View style={styles.modalView1}>
                <Text style={styles.text1}>Menu</Text>
                <Pressable style={styles.menuContainer}>
                  <View style={styles.menuContainerContent}>
                    <MultipleSelectList
                      setSelected={(val) => setSelected(val)}
                      data={data}
                      label="Categories"
                      onSelect={() => console.log(selected)}
                      save="value"
                      notFoundText="No data existx"
                    />
                  </View>
                  <View style={styles.btnGrMenu}>
                    <Button
                      style={styles.btnMenu}
                      title="Lưu"
                      onPress={() => null}
                    />
                    <Button
                      style={styles.btnMenu}
                      title="Huỷ"
                      onPress={() => setModalVisible(!modalVisible)}
                    />
                  </View>
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
          <Pressable
            onPress={() => navigation.navigate("Detail Order", { name: "12" })}
            style={styles.addIconContainer}
          >
            <Entypo name="dots-three-horizontal" size={24} color="#644AB5" />
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};

export default DetailTable;

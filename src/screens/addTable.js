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
const AddTable = ({ navigation }) => {
  return (
    <>
      <Pressable style={styles.viewAddTable}>
        <Text style={styles.text1}>Bàn: </Text>
        <TextInput placeholder="Số" style={styles.textInput} />
        <Pressable
          style={styles.addIconContainer}
          onPress={() => navigation.navigate("Tables", { name: "12" })}
        >
          <Ionicons
            name="checkmark-done-circle-outline"
            size={30}
            color={"#644AB5"}
            style={styles.addIcon}
          />
        </Pressable>
      </Pressable>
    </>
  );
};

export default AddTable;

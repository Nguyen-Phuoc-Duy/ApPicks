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
import EditMenu from "./editMenu";
import DeleteMenu from "./deleteMenu";
import AddMenu from "./addMenu";
const Menu = () => {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  return (
    <>
      <ScrollView>
        <View style={styles.box}>
          <View style={styles.boxLeft}>
            <Text style={styles.text1}>Bia</Text>
            <Text style={styles.text2}>20000/chai</Text>
          </View>
          <View style={styles.boxRight}></View>
        </View>
        <View style={styles.box}>
          <View style={styles.boxLeft}>
            <Text style={styles.text1}>Bia</Text>
            <Text style={styles.text2}>20000/chai</Text>
          </View>
          <View style={styles.boxRight}></View>
        </View>
        <View style={styles.box}>
          <View style={styles.boxLeft}>
            <Text style={styles.text1}>Bia</Text>
            <Text style={styles.text2}>20000/chai</Text>
          </View>
          <View style={styles.boxRight}></View>
        </View>
        <View style={styles.box}>
          <View style={styles.boxLeft}>
            <Text style={styles.text1}>Bia</Text>
            <Text style={styles.text2}>20000/chai</Text>
          </View>
          <View style={styles.boxRight}></View>
        </View>
        <View style={styles.box}>
          <View style={styles.boxLeft}>
            <Text style={styles.text1}>Bia</Text>
            <Text style={styles.text2}>20000/chai</Text>
          </View>
          <View style={styles.boxRight}></View>
        </View>
        <View style={styles.box}>
          <View style={styles.boxLeft}>
            <Text style={styles.text1}>Bia</Text>
            <Text style={styles.text2}>20000/chai</Text>
          </View>
          <View style={styles.boxRight}></View>
        </View>
        <View style={styles.box}>
          <View style={styles.boxLeft}>
            <Text style={styles.text1}>Bia</Text>
            <Text style={styles.text2}>20000/chai</Text>
          </View>
          <View style={styles.boxRight}></View>
        </View>
        <View style={styles.box}>
          <View style={styles.boxLeft}>
            <Text style={styles.text1}>Bia</Text>
            <Text style={styles.text2}>20000/chai</Text>
          </View>
          <View style={styles.boxRight}></View>
        </View>
        <View style={styles.box}>
          <View style={styles.boxLeft}>
            <Text style={styles.text1}>Bia</Text>
            <Text style={styles.text2}>20000/chai</Text>
          </View>
          <View style={styles.boxRight}></View>
        </View>
        <View style={styles.box}>
          <View style={styles.boxLeft}>
            <Text style={styles.text1}>Bia</Text>
            <Text style={styles.text2}>20000/chai</Text>
          </View>
          <View style={styles.boxRight}></View>
        </View>
      </ScrollView>
      {/* <AddMenu /> */}
    </>
  );
};

export default Menu;

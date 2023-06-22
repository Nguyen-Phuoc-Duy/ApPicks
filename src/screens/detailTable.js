import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import styles from "../css/style";
import { Entypo } from "@expo/vector-icons";
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
            <View
            // style={styles.centeredView}
            >
              <View style={styles.modalView1}>
                <Pressable>
                  <Pressable
                  // style={styles.title_exit}
                  >
                    {/* <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>X</Text>
                    </Pressable> */}
                    <Text style={styles.text1}>Menu</Text>
                    <ScrollView style={styles.menu}>
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
                  </Pressable>
                  <Pressable>
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

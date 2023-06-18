import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
const AddMenu = () => {
  return (
    <ScrollView>
      <View style={styles.box}>
        <Text style={styles.text1}>Bia</Text>
        <Text style={styles.text2}>20000/chai</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text1}>Bia</Text>
        <Text style={styles.text2}>20000/chai</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text1}>Bia</Text>
        <Text style={styles.text2}>20000/chai</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text1}>Bia</Text>
        <Text style={styles.text2}>20000/chai</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text1}>Bia</Text>
        <Text style={styles.text2}>20000/chai</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text1}>Bia</Text>
        <Text style={styles.text2}>20000/chai</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text1}>Bia</Text>
        <Text style={styles.text2}>20000/chai</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text1}>Bia</Text>
        <Text style={styles.text2}>20000/chai</Text>
      </View>
    </ScrollView>
  );
};

export default AddMenu;

const styles = StyleSheet.create({
  box: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "#c3c3c3",
    height: 80,
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 20,
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
});

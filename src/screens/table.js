import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { Entypo } from "@expo/vector-icons";
const Tables = () => {
  return (
    <ScrollView>
      <View style={styles.box}>
        <Text style={styles.text}>Table 1</Text>
        <Entypo name="dots-three-horizontal" size={24} color="#644AB5" />
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Table 2</Text>
        <Entypo name="dots-three-horizontal" size={24} color="#644AB5" />
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Table 3</Text>
        <Entypo name="dots-three-horizontal" size={24} color="#644AB5" />
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Table 4</Text>
        <Entypo name="dots-three-horizontal" size={24} color="#644AB5" />
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Table 5</Text>
        <Entypo name="dots-three-horizontal" size={24} color="#644AB5" />
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Table 6</Text>
        <Entypo name="dots-three-horizontal" size={24} color="#644AB5" />
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Table 7</Text>
        <Entypo name="dots-three-horizontal" size={24} color="#644AB5" />
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Table 8</Text>
        <Entypo name="dots-three-horizontal" size={24} color="#644AB5" />
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Table 9</Text>
        <Entypo name="dots-three-horizontal" size={24} color="#644AB5" />
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Table 10</Text>
        <Entypo name="dots-three-horizontal" size={24} color="#644AB5" />
      </View>
    </ScrollView>
  );
};

export default Tables;

const styles = StyleSheet.create({
  box: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "#c3c3c3",
    height: 80,
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#644AB5",
    fontSize: 25,
    fontWeight: 700,
  },
});

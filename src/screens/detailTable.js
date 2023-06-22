import { StyleSheet, Text, View } from "react-native";
import { ScrollView, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import styles from "../css/style";

const DetailTable = () => {
  return (
    <ScrollView>
      <View style={styles.boxTable}>
        <Text style={styles.textTable}>Order 1</Text>
        <Pressable
          // onPress={() => navigation.navigate("Detail Table", { name: "Jane" })}
          style={styles.addIconContainer}
        >
          <Ionicons
            name="ios-add-circle-outline"
            size={30}
            color={"#644AB5"}
            style={styles.addIcon}
          />
        </Pressable>
        <Entypo name="dots-three-horizontal" size={24} color="#644AB5" />
      </View>
    </ScrollView>
  );
};

export default DetailTable;

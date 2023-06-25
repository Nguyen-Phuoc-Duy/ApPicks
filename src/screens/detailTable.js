import { TouchableOpacity, Text, View, Pressable, Modal } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import styles from "../css/style";
import { Entypo } from "@expo/vector-icons";
import SelectMultiple from "react-native-select-multiple";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { AuthContext } from "../context/authProvider";
import ModalAddOrder from "../components/modal/addOrder";
import Loader from "../components/loader";
const DetailTable = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { useFetch } = useContext(AuthContext);

  useEffect(() => {
    if(route.params){
      let { ID } = route.params;
      if(ID) {
        getOrders(ID)
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity style={{
              backgroundColor: 'white',
              alignItems: 'center',
            }} onPress={() => setModalVisible(true)}>
              <Ionicons
                  name="ios-add-circle-outline"
                  size={30}
                  color={"#644AB5"}
                  style={styles.addIcon}
              />
            </TouchableOpacity>
          )
        })
      }
    }
  },[route.params])

  const getOrders = async (ID) => {
    try {
      setIsLoading(true);
      let result = await useFetch('orders/getOrdersByTable/' + ID);
      if(result.errCode === 200) {
        setOrders(result.data)
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <ScrollView>
        {orders && orders.map(order => (
          <TouchableOpacity key={order.ID} style={styles.boxTable}
            onPress={() => navigation.navigate({
              name: "Detail Order",
              params: { ID: order.ID, order }
            })}
          >
            <Text style={styles.textTable}>{order.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {modalVisible && <ModalAddOrder setModalVisible={setModalVisible} />}
    </>
  );
};

export default DetailTable;

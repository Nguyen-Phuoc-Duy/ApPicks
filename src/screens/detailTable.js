import {
  TouchableOpacity,
  Text,
  View,
  Pressable,
  Modal,
  RefreshControl,
} from "react-native";
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
import Badge from "../components/badge";
import { getColorStatus } from "../constant/status";
import color from "../constant/colorVariable";
const DetailTable = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const [menuProducts, setMenuProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { useFetch } = useContext(AuthContext);

  useEffect(() => {
    if (route.params) {
      let { ID } = route.params;
      if (ID) {
        getOrders(ID);
        getAllProduct();
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                alignItems: "center",
              }}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons
                name="ios-add-circle-outline"
                size={30}
                color={color.primary}
                style={styles.addIcon}
              />
            </TouchableOpacity>
          ),
        });
      }
    }
  }, [route.params]);

  const getOrders = async (ID) => {
    try {
      setIsLoading(true);
      let result = await useFetch("orders/getOrdersByTable/" + ID);
      if (result.errCode === 200) {
        setOrders(result.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getAllProduct = async () => {
    const result = await useFetch("products/getAll");
    if (result.errCode === 200) {
      setMenuProducts(result?.data || []);
    }
  };

  const addOrder = (newOrder) => {
    if (!newOrder) return;
    setOrders((prev) => {
      if (prev && Array.isArray(prev)) {
        prev.unshift(newOrder);
        return [...prev];
      }
      return prev;
    });
  };

  const onRefresh = () => {
    if (route.params) {
      let { ID } = route.params;
      if (ID) {
        getOrders(ID);
        getAllProduct();
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        {orders &&
          orders.map((order) => (
            <TouchableOpacity
              key={order.ID}
              style={styles.boxTable}
              onPress={() =>
                navigation.navigate({
                  name: "Detail Order",
                  params: { ID: order.ID, order, menuProducts },
                })
              }
            >
              <Text style={styles.textTable}>{order.name}</Text>
              <Text>
                <Badge
                  label={order.status}
                  color={getColorStatus[order.status]}
                />
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
      {modalVisible && (
        <ModalAddOrder
          setModalVisible={setModalVisible}
          menus={menuProducts}
          tableId={route.params?.ID}
          addOrder={addOrder}
        />
      )}
    </>
  );
};

export default DetailTable;

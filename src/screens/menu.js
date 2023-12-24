import { Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/authProvider";
import ModalAddProduct from "../components/modal/addProduct";
import { RefreshControl } from "react-native";
import Loader from "../components/loader";
import useAlert from "../hook/useAlert";
import color from "../constant/colorVariable";
import { StyleSheet } from "react-native";
import SelectDropdown from "../components/selectDropdown";
const Menu = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [productEdit, setProductEdit] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [refesh, setRefesh] = useState(false);
  const [filter, setFilter] = useState("");
  // const [search, setSearch] = useState("");
  const { useFetch, user } = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Menu",
      headerRight: () =>
        user && ["admin", "manager"].includes(user.role) ? (
          <>
            {/* <TouchableOpacity
              style={styles.btnIcon}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons
                name="ios-add-circle-outline"
                size={30}
                color={color.primary}
                style={styles.addIcon}
              />
            </TouchableOpacity> */}
            <SelectDropdown options={filterStatus} onChange={setFilter}>
              <Ionicons
                name="filter-outline"
                size={30}
                color={color.primary}
                style={styles.addIcon}
              />
            </SelectDropdown>
          </>
        ) : (
          ""
        ),
    });
  }, []);

  useEffect(() => {
    if (!modalVisible) {
      setProductEdit({});
    }
  }, [modalVisible]);

  const getProducts = async (status = "", filterName = "") => {
    try {
      let orderBy = "";
      if (["DESC", "ASC"].includes(status)) {
        orderBy = status;
        status = "";
      }
      setIsLoading(true);
      // let result = await useFetch('admin/getAllOrders', { status, orderBy, filterName }, 'POST');
      // if (result.errCode === 200) {
      //     setOrders(result?.data || [])
      //     setTotalPrice(result.totalRevenue)
      // }
      let result = await useFetch(
        "products/getAll",
        { status, orderBy, filterName },
        "POST"
      );
      if (result.errCode === 200) {
        setProducts(result.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }

    // let result = await useFetch("products/getAll");
    // if (result.errCode === 200) {
    //   setProducts(result.data);
    // }
  };
  useEffect(() => {
    getProducts(filter);
  }, [filter]);
  const handleDeleteProduct = async (product) => {
    try {
      let { ID, name } = product;
      if (!ID || isLoading) return;
      setIsLoading(true);
      let confirm = await useAlert.alertSync(
        "Are you sure?",
        `Are you sure you want to delete product: ${name}`,
        true
      );

      if (confirm) {
        const result = await useFetch(
          "admin/deleteProduct/" + ID,
          null,
          "DELETE"
        );
        if (result.errCode === 200) {
          let newProducts = products.filter((product) => product.ID !== ID);
          setProducts(newProducts);
        } else {
          console.log(result);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefesh(true);
    await getProducts();
    setRefesh(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refesh} onRefresh={onRefresh} />
      }
      style={styles.root}
    >
      {isLoading && <Loader />}
      {products &&
        products.map((product) => (
          <TouchableOpacity
            onPress={() => {
              setProductEdit(product);
              setModalVisible(true);
            }}
            key={product.ID}
            style={styles.boxTable}
          >
            <View key={product.ID} style={styles.containerRow}>
              <View style={styles.wrapperName}>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.label}>
                  {product.price?.toLocaleString("en-gb")}/{product.unit}
                </Text>
              </View>
              <View style={styles.grBtnHorizontal}>
                {user && ["admin", "manager"].includes(user.role) && (
                  <TouchableOpacity
                    style={styles.btnIcon}
                    onPress={() => handleDeleteProduct(product)}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={30}
                      color={color.primaryText}
                      style={styles.addIcon}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      {modalVisible && (
        <ModalAddProduct
          setModalVisible={setModalVisible}
          onChange={setProducts}
          productEdit={productEdit}
        />
      )}
    </ScrollView>
  );
};
const filterStatus = [
  { label: "Mới nhất", value: "DESC" },
  { label: "Cũ nhất", value: "ASC" },
];
const styles = StyleSheet.create({
  root: {
    marginBottom: 20,
  },
  boxTable: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: color.primary,
    height: 80,
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  containerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wrapperName: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title: {
    color: color.primaryText,
    fontSize: 25,
    fontWeight: 700,
  },
  label: {
    color: color.primaryText,
    fontSize: 15,
  },
  btnIcon: {
    padding: 10,
  },
  grBtnHorizontal: {
    flexDirection: "row",
    gap: 10,
  },
});

export default Menu;

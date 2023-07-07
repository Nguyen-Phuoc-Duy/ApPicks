import { Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../css/style";
import { AuthContext } from "../context/authProvider";
import ModalAddProduct from "../components/modal/addProduct";
import { RefreshControl } from "react-native";
import Loader from "../components/loader";
import useAlert from "../hook/useAlert";
import color from "../constant/colorVariable";

const Menu = ({ navigation, navigationParent }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [productEdit, setProductEdit] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [refesh, setRefesh] = useState(false);

  const { useFetch, user } = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Menu",
      headerRight: () =>
        user && ["admin", "manager"].includes(user.role) ? (
          <TouchableOpacity
            style={styles.btnIcon}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons
              name="ios-add-circle-outline"
              size={30}
              color={color.primary}
              style={styles.addIcon}
            />
          </TouchableOpacity>
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

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await useFetch("products/getAll");
    if (result.errCode === 200) {
      setProducts(result.data);
    }
  };

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
    >
      {isLoading && <Loader />}
      {products &&
        products.map((product) => (
          <TouchableOpacity
            key={product.ID}
            // onPress={() =>
            //   navigation.navigate("Detail Table", { ID: product.ID })
            // }
            style={styles.boxTable}
          >
            <View key={product.ID} style={styles.containerRow}>
              <Text style={styles.textTable}>{product.name}</Text>
              <Text style={styles.textTable}>
                {product.price}/{product.unit}
              </Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                {user && ["admin", "manager"].includes(user.role) && (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        setProductEdit(product);
                        setModalVisible(true);
                      }}
                    >
                      <Ionicons
                        name="create-outline"
                        size={30}
                        color={color.primaryText}
                        style={styles.addIcon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeleteProduct(product)}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={30}
                        color={color.primaryText}
                        style={styles.addIcon}
                      />
                    </TouchableOpacity>
                  </>
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

export default Menu;

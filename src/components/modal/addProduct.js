import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { TouchableOpacity, Text, TextInput, View } from "react-native";
import styles from "../../css/style";
import useAlert from "../../hook/useAlert";
import { Modal } from "react-native";
import { AuthContext } from "../../context/authProvider";
import Loader from "../loader";

const ModalAddProduct = ({ setModalVisible, onChange, productEdit = {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [nameProduct, setnameProduct] = useState(productEdit.name || "");
  const [priceProduct, setpriceProduct] = useState(productEdit.price || "");
  const [unitProduct, setunitProduct] = useState(productEdit.unit || "");

  const { useFetch } = useContext(AuthContext);
  const checkValue = () => {
    if (priceProduct && !isNaN(priceProduct)) {
      return priceProduct;
    } else {
      useAlert.alert("Failed", "Price is a number");
      return productEdit.price ? productEdit.price : 0;
    }
  };
  const handleAddProduct = async () => {
    try {
      setIsLoading(true);
      if (productEdit?.name || productEdit?.price || productEdit?.unit) {
        if (
          (nameProduct && nameProduct !== productEdit.name) ||
          (priceProduct && priceProduct !== productEdit.price) ||
          (unitProduct && unitProduct !== productEdit.unit)
        ) {
          let result = await useFetch(
            "admin/updateProduct",
            {
              ID: productEdit.ID,
              name: nameProduct,
              price: priceProduct,
              unit: unitProduct,
            },
            "POST"
          );
          if (result.errCode === 200) {
            result = result.data;
            onChange?.((prev) => {
              if (prev && Array.isArray(prev)) {
                prev.forEach((product) => {
                  if (product.ID === productEdit.ID) {
                    product.name = nameProduct;
                    product.price = checkValue();
                    product.unit = unitProduct;
                  }
                });
                return [...prev];
              }
              return prev;
            });
          } else {
            console.log(result);
          }
        }
      } else {
        if (nameProduct || priceProduct || unitProduct) {
          let result = await useFetch(
            "admin/createProduct",
            {
              name: nameProduct,
              price: checkValue(),
              unit: unitProduct,
            },
            "POST"
          );
          if (result.errCode === 200) {
            result = result.data;
            onChange?.((prev) => {
              if (prev && Array.isArray(prev)) {
                prev.unshift(result);
                return [...prev];
              }
              return prev;
            });
          }
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setModalVisible(false);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={true}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      {isLoading && <Loader />}
      <View style={styles.viewAddTable}>
        <Text style={styles.text1}>Tên: </Text>
        <TextInput
          placeholder="Name"
          style={styles.textInput}
          onChangeText={setnameProduct}
          value={nameProduct}
        />
        <Text style={styles.text1}>Giá: </Text>
        <TextInput
          placeholder="Price"
          style={styles.textInput}
          onChangeText={setpriceProduct}
          value={priceProduct.toString()}
        />
        <Text style={styles.text1}>Đơn vị: </Text>
        <TextInput
          placeholder="Unit"
          style={styles.textInput}
          onChangeText={setunitProduct}
          value={unitProduct}
        />
        <View style={styles.btnGrMenu}>
          <TouchableOpacity style={styles.btnIcon} onPress={handleAddProduct}>
            <Ionicons
              name="checkmark-done-circle-outline"
              size={30}
              color={"#644AB5"}
              style={styles.addIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnIcon}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons
              name="close-circle-outline"
              size={30}
              color={"#644AB5"}
              style={styles.addIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddProduct;

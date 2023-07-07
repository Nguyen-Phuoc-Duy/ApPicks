import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "../../css/style";
import useAlert from "../../hook/useAlert";
import { Modal } from "react-native";
import { AuthContext } from "../../context/authProvider";
import Loader from "../loader";
import InputCustom from "../inputCustom";
import color from "../../constant/colorVariable";

const ModalAddProduct = ({ setModalVisible, onChange, productEdit = {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [nameProduct, setnameProduct] = useState(productEdit.name || "");
  const [priceProduct, setpriceProduct] = useState(productEdit.price || "");
  const [unitProduct, setunitProduct] = useState(productEdit.unit || "");

  const { useFetch } = useContext(AuthContext);

  const handleAddProduct = async () => {
    try {
      setIsLoading(true);
      if (productEdit?.name) {
        if (nameProduct && nameProduct !== productEdit.name) {
          let result = await useFetch(
            "admin/updateProduct",
            {
              ID: productEdit.ID,
              name: nameProduct,
              price: parseFloat(priceProduct),
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
                    product.price = priceProduct.toString();
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
        if (nameProduct) {
          let result = await useFetch(
            "admin/createProduct",
            {
              name: nameProduct,
              price: parseFloat(priceProduct),
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
      <Text style={styles.text1}>Thêm sản phẩm</Text>
      <View style={styles.viewAddTable}>
        <Text style={styles.text1}>Tên: </Text>
        <InputCustom
          name='name'
          placeholder="Name"
          style={styles.textInput}
          onChange={setnameProduct}
          value={nameProduct}
        />
        <Text style={styles.text1}>Giá: </Text>
        <InputCustom
          name='price'
          placeholder="Price"
          style={styles.textInput}
          onChange={setpriceProduct}
          value={priceProduct.toString()}
        />
        <Text style={styles.text1}>Đơn vị: </Text>
        <InputCustom
          name='unit'
          placeholder="Unit"
          style={styles.textInput}
          onChange={setunitProduct}
          value={unitProduct}
        />
        <View style={styles.btnGrMenu}>
          <TouchableOpacity style={styles.btnIcon} onPress={handleAddProduct}>
            <Ionicons
              name="checkmark-done-circle-outline"
              size={30}
              color={color.primary}
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
              color={color.primary}
              style={styles.addIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddProduct;

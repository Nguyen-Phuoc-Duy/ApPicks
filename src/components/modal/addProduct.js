import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
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
  const [formValue, setFormValue] = useState({
    name: productEdit.name || "",
    price: productEdit.price || "",
    unit: productEdit.unit || ""
  });
  const [disableSubmit, setDisableSubmit] = useState(false);
  // const [nameProduct, setnameProduct] = useState(productEdit.name || "");
  // const [priceProduct, setpriceProduct] = useState(productEdit.price || "");
  // const [unitProduct, setunitProduct] = useState(productEdit.unit || "");

  const { useFetch } = useContext(AuthContext);

  // const checkValue = () => {
  //   if (priceProduct && !isNaN(priceProduct)) {
  //     return priceProduct;
  //   } else {
  //     useAlert.alert("Failed", "Price is a number");
  //     return productEdit.price ? productEdit.price : 0;
  //   }
  // };

  const handleAddProduct = async () => {
    let warning = false;
    try {
      setIsLoading(true);
      let { name, price, unit } = formValue;
      if (Object.values(productEdit).length) {
        let result = await useFetch(
          "admin/updateProduct",
          {
            ID: productEdit.ID,
            name: name,
            price: price,
            unit: unit,
          },
          "POST"
        );
        if (result.errCode === 200) {
          result = result.data;
          onChange?.((prev) => {
            if (prev && Array.isArray(prev)) {
              prev.forEach((product) => {
                if (product.ID === productEdit.ID) {
                  Object.assign(product, {
                    name, price, unit
                  })
                }
              });
              return [...prev];
            }
            return prev;
          });
        } else {
          console.log(result);
        }
      } else {
        if (name && price && unit) {
          let result = await useFetch(
            "admin/createProduct",
            {
              name,
              price,
              unit,
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
          } else {
            console.log(result)
          }
        } else {
          warning = true;
          useAlert.alert('Warning', 'Vui lòng nhập đủ thông tin sản phẩm!');
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      if (!warning) {
        setModalVisible(false);
      }
      setIsLoading(false);
    }
  };
  
  const handleChangeValueForm = (field, value) => {
    let newForm = {...formValue};
    newForm[field] = value;

    setFormValue(newForm);
  }

  useEffect(() => {
    if (Object.values(productEdit).length) {
      let change = false;
      Object.keys(formValue).map(key => {
        if (formValue[key] !== productEdit[key]) {
          change = true;
        }
      })
      setDisableSubmit(!change);
    }

  },[formValue]);

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
          onChange={(value) => handleChangeValueForm('name', value)}
          value={formValue.name}
        />
        <Text style={styles.text1}>Giá: </Text>
        <InputCustom
          type="number"
          name='price'
          placeholder="Price"
          style={styles.textInput}
          onChange={(value) => handleChangeValueForm('price', value)}
          value={formValue.price}
        />
        <Text style={styles.text1}>Đơn vị: </Text>
        <InputCustom
          name='unit'
          placeholder="Unit"
          style={styles.textInput}
          onChange={(value) => handleChangeValueForm('unit', value)}
          value={formValue.unit}
        />
        <View style={styles.btnGrMenu}>
          <TouchableOpacity style={styles.btnIcon} onPress={handleAddProduct}
            disabled={disableSubmit}
          >
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

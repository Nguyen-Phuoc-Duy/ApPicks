import { TouchableOpacity, Text, View, Pressable, Modal, RefreshControl } from "react-native";
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
import ModalAddUsers from "../components/modal/addUsers";
import useAlert from "../hook/useAlert";
const Users = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [menuProducts, setMenuProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefesh, setIsRefesh] = useState(false);

  const { useFetch } = useContext(AuthContext);

  useEffect(() => {
    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity onPress={() => setModalVisible(true)}
            style={{
                marginRight: 20
            }}>
                <Ionicons
                    name="person-add-outline"
                    size={30}
                    color={color.primary}
                />
            </TouchableOpacity>
        )
    })
  },[])

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      let result = await useFetch('users/getAll');
      if(result.errCode === 200) {
        setListUsers(result.data)
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleAddUser = (user) => {
    listUsers.push(user);
    setListUsers(listUsers);
  }


  const onRefresh = async () => {
    setIsRefesh(true);
    await getAllUsers();
    setIsRefesh(false);
  }

  const handleLockOrUnlock = async (user) => {
    try {
        setIsLoading(true);
        if (!user) return;
        let opts = {};
        let message = '';

        if (user.locked) {
            opts.isLocked = false;
            message = 'Are you sure you want to unLocked this user?';
        } else {
            opts.isLocked = true;
            message = 'Are you sure you want to locked this user?';
        }

        let confirm = await useAlert.alertSync('Are you sure', message);

        if (!confirm) return;

        const result = await useFetch('admin/lockOrUnlockUser/' + user.ID, opts, 'POST');
        if (result.errCode === 200) {
            let findUser = listUsers.find(u => u.ID === user.ID);
            findUser.locked = !user.locked;
            setListUsers(listUsers);
        }
    } catch (e) {
        console.log(e);
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <ScrollView refreshControl={<RefreshControl refreshing={isRefesh} onRefresh={onRefresh} />}>
        {listUsers && listUsers.map(user => (
          <View key={user.ID} style={styles.boxTable}>
            <Text style={styles.textTable}>{user.name}</Text>
            <TouchableOpacity onPress={() => handleLockOrUnlock(user)}>
                <Ionicons 
                    name={user.locked ? 'lock-open-outline' : 'lock-closed-outline'}
                    size={30}
                    color={color.primaryText}
                />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {modalVisible && <ModalAddUsers setModalVisible={setModalVisible} addNewUser={handleAddUser} />}
    </>
  );
};


export default Users;

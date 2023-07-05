import { TouchableOpacity, Text, View, Pressable, Modal, RefreshControl } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../css/style";
import { AuthContext } from "../context/authProvider";
import Loader from "../components/loader";
import color from "../constant/colorVariable";
import ModalAddUsers from "../components/modal/addUsers";
import useAlert from "../hook/useAlert";
const Users = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [listUsers, setListUsers] = useState([]);
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
    getAllUsers();
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

  return (
    <>
      {isLoading && <Loader />}
      <ScrollView refreshControl={<RefreshControl refreshing={isRefesh} onRefresh={onRefresh} />}>
        {listUsers && listUsers.map(user => (
          <TouchableOpacity key={user.ID} style={styles.boxTable}
            onPress={() => navigation.navigate({
              name: 'ViewProfile',
              params: { info: user }
            })}
          >
            <Text style={styles.textTable}>{user.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {modalVisible && <ModalAddUsers setModalVisible={setModalVisible} addNewUser={handleAddUser} />}
    </>
  );
};


export default Users;

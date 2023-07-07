import { TouchableOpacity, Text, RefreshControl } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../css/style";
import { AuthContext } from "../context/authProvider";
import Loader from "../components/loader";
import color from "../constant/colorVariable";
import ModalAddUsers from "../components/modal/addUsers";
import { StyleSheet } from "react-native";
const Users = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefesh, setIsRefesh] = useState(false);

  const { user, useFetch } = useContext(AuthContext);

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
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate({
            name: 'ViewProfile',
            params: { info: user, adminUpdate: true }
          })}
            style={style.btnLeft}>
                <Ionicons
                    name="sync-circle-outline"
                    size={20}
                    color={color.primary}
                />
                <Text style={style.btnLeftText}>Change profile</Text>
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
        {listUsers && listUsers.map(userInfo => (
          <TouchableOpacity key={userInfo.ID} style={styles.boxTable}
            onPress={() => navigation.navigate({
              name: 'ViewProfile',
              params: { info: userInfo }
            })}
          >
            <Text style={styles.textTable}>{userInfo.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {modalVisible && <ModalAddUsers setModalVisible={setModalVisible} addNewUser={handleAddUser} />}
    </>
  );
};

const style = StyleSheet.create({
  btnLeft: {
      marginLeft: 20,
      alignItems: 'center',
      justifyContent: 'center',
  },
  btnLeftText: {
    color: color.primary,
    fontSize: 12
  }
})


export default Users;

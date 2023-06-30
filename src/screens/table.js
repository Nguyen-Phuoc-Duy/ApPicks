import { Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../css/style";
import { AuthContext } from "../context/authProvider";
import ModalAddTable from "../components/modal/addTable";
import { RefreshControl } from "react-native";
import Loader from "../components/loader";
import useAlert from "../hook/useAlert";
import color from "../constant/colorVariable";

const Tables = ({ navigation, navigationParent }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tables,setTables] = useState([]);
  const [tableEdit,setTableEdit] = useState({});
  const [isLoading,setIsLoading] = useState(false);
  const [refesh, setRefesh] = useState(false);
  
  const { useFetch, user } = useContext(AuthContext);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Tables",
      headerRight: () => (user && ['admin', 'manager'].includes(user.role)) ? (
        <TouchableOpacity style={styles.btnIcon}
            onPress={() => setModalVisible(true)}>
            <Ionicons
                name="ios-add-circle-outline"
                size={30}
                color={color.primary}
                style={styles.addIcon}
            />
        </TouchableOpacity>
      ) : '',
    })
  },[]);

  useEffect(() => {
    if(!modalVisible) {
      setTableEdit({});
    }
  },[modalVisible])

  useEffect(() => {
    getTables();
  },[])

  const getTables = async () => {
    let result = await useFetch('tables/getAll');
    if(result.errCode === 200) {
      setTables(result.data)
    }else if ([400,401].includes(result?.errCode)){
      navigationParent.navigate('Login');
    }
  }

  const handleDeleteTable = async (table) => {
    try {
      let { ID, name } = table; 
      if(!ID || isLoading) return;
      setIsLoading(true);
      let confirm = await useAlert.alertSync('Are you sure?', `Are you sure you want to delete table: ${name}`, true);
      
      if (confirm) {
        const result = await useFetch('admin/deleteTable/' + ID, null, 'DELETE');

        if (result.errCode === 200) {
          let newTables = tables.filter(table => table.ID !== ID);
          setTables(newTables);
        }else {
          console.log(result)
        }
      }

    } finally {
      setIsLoading(false);
    }
  }

  const onRefresh = async () => {
    setRefesh(true);
    await getTables();
    setRefesh(false);
  }

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refesh} onRefresh={onRefresh} />}>
        {isLoading && <Loader />}
        {tables && tables.map(table => (
            <TouchableOpacity key={table.ID}
              onPress={() => navigation.navigate('Detail Table', { ID: table.ID })}
              style={styles.boxTable}
            >
              <View key={table.ID} style={styles.containerRow}>
                <Text style={styles.textTable}>{table.name}</Text>
                <View style={{ flexDirection: 'row', gap: 10}}>
                  {user && ['admin','manager'].includes(user.role) && (
                    <>
                      <TouchableOpacity onPress={() => {
                        setTableEdit(table)
                        setModalVisible(true);
                      }}>
                        <Ionicons 
                          name="create-outline"
                          size={30}
                          color={color.primaryText}
                          style={styles.addIcon}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDeleteTable(table)}>
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
          <ModalAddTable setModalVisible={setModalVisible} onChange={setTables} tableEdit={tableEdit} />
        )}
      </ScrollView>
  );
};

export default Tables;
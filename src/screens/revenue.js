import { StyleSheet, Text, View, ScrollView, RefreshControl, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import Loader from "../components/loader";
import { AuthContext } from "../context/authProvider";
import color from "../constant/colorVariable";
import Badge from "../components/badge";
import { getColorStatus } from "../constant/status";
import { Ionicons } from "@expo/vector-icons";
import SelectDropdown from "../components/selectDropdown";

const Revenue = ({ navigation }) => {
    const { useFetch } = useContext(AuthContext);

    const [isRefesh, setIsRefesh] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [filter, setFilter] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <SelectDropdown options={filterStatus} onChange={setFilter}>
                    <Ionicons
                        name="filter-outline"
                        size={30}
                        color={color.primary}
                        style={styles.addIcon}
                    />
                </SelectDropdown>
            )
        })
    },[])

    const getAllOrders = async (status = '') => {
        try {
            setIsLoading(true);
            let result = await useFetch('admin/getAllOrders', { status }, 'POST');
            if (result.errCode === 200) {
                setOrders(result?.data || [])
                setTotalPrice(result.totalRevenue)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false);
        }
    }

    const handleRedirect = (orderId) => {
        navigation.navigate('ViewDetailOrder', { orderId });
    };

    useEffect(() => {
        getAllOrders(filter);
    }, [filter])

    const onRefresh = async () => {
        setIsRefesh(true)
        await getAllOrders();
        setIsRefesh(false)
    }

    return (
        <>
            {isLoading && <Loader />}
            <SafeAreaView style={styles.container}>
                <ScrollView refreshControl={<RefreshControl refreshing={isRefesh} onRefresh={onRefresh} />}>
                    {orders && orders.map(order =>  order && (
                        <TouchableOpacity key={order.ID} style={styles.boxTable} onPress={() => handleRedirect(order.ID)}>
                            <Text style={styles.orderName}>{order.name}</Text>
                            <Badge label={order.status} color={getColorStatus[order.status]} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={styles.totalRevenueRegion}>
                    <Text style={styles.totalRevenue}>Total Revenue: {totalPrice.toLocaleString('en-gb')} vnd</Text>
                </View>
            </SafeAreaView>
        </>
    );
};

export default Revenue;

const filterStatus = [
    { label: 'All', value: '' },
    { label: 'Started', value: 'started' },
    { label: 'InProgress', value: 'inProgress' },
    { label: 'Finished', value: 'finished' },
    { label: 'Canceled', value: 'canceled' },
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    totalRevenueRegion: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
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
        borderRadius: 10
    },
    orderName: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold"
    },
    totalRevenue: {
        color: color.primaryText,
        fontSize: 25,
        fontWeight: "bold"
    },
    btnIcon: {
		padding: 10,
		paddingTop: 0,
		paddingBottom: 0,
		borderRadius: 99,
		backgroundColor: "transparent"
	},
    addIcon: {
        marginVertical: 10,
    },
});
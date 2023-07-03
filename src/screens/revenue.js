import { StyleSheet, Text, View, ScrollView, RefreshControl, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import Loader from "../components/loader";
import { AuthContext } from "../context/authProvider";
import color from "../constant/colorVariable";
import Badge from "../components/badge";
import { getColorStatus } from "../constant/status";

const Revenue = ({ navigation }) => {
    const { useFetch } = useContext(AuthContext);


    const [isLoading, setIsLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const getAllOrders = async () => {
        let result = await useFetch('admin/getAllOrders');
        if (result.errCode === 200) {
            setOrders(result?.data || [])
            setTotalPrice(result.totalRevenue)
        }
    }

    const handleRedirect = (orderId) => {
        navigation.navigate('ViewDetailOrder', { orderId });
    };

    useEffect(() => {
        getAllOrders();
    }, [])

    const onRefresh = async () => {
        setIsLoading(true)
        await getAllOrders();
        setIsLoading(false)
    }

    return (
        <>
            {isLoading && <Loader />}
            <SafeAreaView style={styles.container}>
                <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}>
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
    }
});
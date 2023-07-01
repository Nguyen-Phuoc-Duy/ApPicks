import { StyleSheet, Text, View, ScrollView, RefreshControl, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import Loader from "../components/loader";
import { AuthContext } from "../context/authProvider";

const Revenue = ({ navigation, navigationParent }) => {
    const { useFetch } = useContext(AuthContext);


    const [isLoading, setIsLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const getAllOrders = async () => {
        let result = await useFetch('admin/getAllOrders');
        if (result.errCode === 200) {
            setOrders(result?.data || [])
            setTotalPrice(result.totalRevenue)
        } else if ([400, 401].includes(result?.errCode)) {
            navigationParent.navigate('Login');
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
            <View style={styles.container}>
                <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}>
                    {orders && orders.map(order => (
                        <TouchableOpacity key={order.ID} style={styles.boxTable} onPress={() => handleRedirect(order.ID)}>
                            <Text style={styles.orderName}>{order.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={styles.totalRevenueRegion}>
                    <Text style={styles.totalRevenue}>Total Revenue: {totalPrice.toLocaleString('en-gb')} vnd</Text>
                </View>
            </View>
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
        backgroundColor: '#E6E6FA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxTable: {
        marginTop: 20,
        marginHorizontal: 20,
        backgroundColor: "#9932CC",
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
        color: "#644AB5",
        fontSize: 25,
        fontWeight: "bold"
    }
});
import React, { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import { AuthContext } from "../context/authProvider";
import Badge from "../components/badge";
import { getColorStatus } from "../constant/status";
import color from "../constant/colorVariable";

const ViewDetailOrder = ({ navigation, route }) => {
    const { useFetch } = useContext(AuthContext);
    const [orderTotalPrice, setOrderTotalPrice] = useState(0);
    const [orderDetails, setOrderDetails] = useState([]);
    const { order } = route.params;

    const getOrderDetails = async () => {
        let result = await useFetch("orders/getDetailOrder/" + order.ID);
        if (result.errCode === 200) {
            let total = 0;
            setOrderDetails(result?.data || []);
            result.data.map((item) => {
                total += item.price * item.quantity;
            });
            setOrderTotalPrice(total);
        } else if ([400, 401].includes(result?.errCode)) {
            navigationParent.navigate("Login");
        }
    };

    useEffect(() => {
        if (!order) return;
        getOrderDetails();
        navigation.setOptions({
            headerRight: () => {
                if (order.checkoutBy) {
                    return (
                        <View style={styling.headerInfo}>
                            <Text style={styling.label}>Checkout By:</Text>
                            <Text style={styling.label}>{order.checkoutBy.name}</Text>
                        </View>
                    );
                } else if (order.createdBy) {
                    return (
                        <View style={styling.headerInfo}>
                            <Text style={styling.label}>Order By:</Text>
                            <Text style={styling.label}>{order.createdBy.name}</Text>
                        </View>
                    );
                } else {
                    return "";
                }
            },
        });
    }, [order]);

    return (
        <View style={styling.container}>
            <View style={styling.header}>
                <Text style={styling.orderName}>{order?.name || "Order"}</Text>
                <Text style={styling.statusBadge}>
                    <Badge
                        label={order?.status || "not found"}
                        color={getColorStatus[order?.status || ""] || "info"}
                    />
                </Text>
            </View>
            <View style={styling.menuRegion}>
                <ScrollView>
                    {orderDetails &&
                        orderDetails.map((orderDetail) => (
                            <View key={orderDetail.ID} style={styling.orderItem}>
                                <View>
                                    <Text style={styling.itemName}>{orderDetail.name}</Text>
                                    <Text style={styling.itemPrice}>
                                        {orderDetail.price?.toLocaleString("en-gb")}/
                                        {orderDetail.unit}
                                    </Text>
                                </View>
                                <View style={styling.counter}>
                                    <Text style={styling.itemQuantity}>
                                        Quantity: {orderDetail.quantity}
                                    </Text>
                                </View>
                            </View>
                        ))}
                </ScrollView>
                <View style={styling.totalMoneyRegion}>
                    <Text style={styling.totalMoney}>
                        Total Price: {orderTotalPrice?.toLocaleString("en-gb")} vnđ
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default ViewDetailOrder;

const styling = StyleSheet.create({
    container: {
        borderColor: color.primary,
        borderWidth: 2,
        margin: 10,
        borderRadius: 5,
        flex: 1,
        padding: 15,
        justifyContent: "space-between",
    },
    header: {
        borderBottomColor: color.primary,
        borderBottomWidth: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    orderName: {
        fontSize: 30,
        color: color.primary,
        fontWeight: "bold",
        paddingBottom: 5,
        textAlignVertical: "center",
    },
    employeeName: {
        fontSize: 15,
        color: color.primary,
        fontWeight: "bold",
        textAlignVertical: "center",
    },
    menuRegion: {
        marginTop: 10,
        flex: 1,
    },
    orderItem: {
        margin: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    itemName: {
        color: color.primary,
        fontSize: 22,
        fontWeight: "bold",
    },
    itemPrice: {
        color: color.primary,
        fontSize: 18,
    },
    counter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: 120,
    },
    totalMoney: {
        fontSize: 25,
        color: color.primary,
        fontWeight: "bold",
        textAlign: "right",
    },
    statusBadge: {
        marginBottom: 7,
    },
    itemQuantity: {
        fontSize: 20,
        fontWeight: "bold",
        color: color.primary,
    },
    totalMoneyRegion: {
        borderTopColor: color.primary,
        borderTopWidth: 2,
        paddingRight: 5,
        paddingTop: 10,
    },
    headerInfo: {
        flexDirection: "column",
        alignItems: "flex-end",
    },
    label: {
        fontSize: 14,
        color: color.danger,
    },
});

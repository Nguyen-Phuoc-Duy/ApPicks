import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from "../context/authProvider";
import Badge from '../components/badge';
import { getColorStatus } from '../constant/status';

const ViewDetailOrder = ({ navigation, navigationParent }) => {
    const route = useRoute();
    const { useFetch } = useContext(AuthContext);

    const [orderName, setOrderName] = useState('NoName')
    const [orderStatus, setOrderStatus] = useState('')
    const [orderTotalPrice, setOrderTotalPrice] = useState(0)
    const [orderDetails, setOrderDetails] = useState([])
    const { orderId } = route.params;

    const getOrderInfo = async () => {
        let result = await useFetch('admin/getOrderByID/' + orderId);
        if (result.errCode === 200) {
            setOrderName(result?.data.name)
            setOrderStatus(result?.data.status)
        } else if ([400, 401].includes(result?.errCode)) {
            navigationParent.navigate('Login');
        }
    }

    const getOrderDetails = async () => {
        let result = await useFetch('orders/getDetailOrder/' + orderId);
        if (result.errCode === 200) {
            let total = 0
            setOrderDetails(result?.data || [])
            result.data.map((item) => {
                total += item.price
            });
            setOrderTotalPrice(total);
        } else if ([400, 401].includes(result?.errCode)) {
            navigationParent.navigate('Login');
        }
    }

    useEffect(() => {
        getOrderInfo(),
            getOrderDetails()
    }, [])

    return (
        <View style={styling.container}>
            <View style={styling.header}>
                <Text style={styling.orderName}>{orderName}</Text>
                <Text style={styling.statusBadge}><Badge label={orderStatus} color={getColorStatus[orderStatus]} /></Text>
            </View>
            <View style={styling.menuRegion}>
                <ScrollView>
                    {orderDetails && orderDetails.map(orderDetail => (
                        <View style={styling.orderItem}>
                            <View>
                                <Text style={styling.itemName}>{orderDetail.name}</Text>
                                <Text style={styling.itemPrice}>{orderDetail.price}/{orderDetail.unit}</Text>
                            </View>
                            <View style={styling.counter}>
                                <Text style={styling.itemQuantity}>Quantity: {orderDetail.quantity}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <View style={styling.totalMoneyRegion}>
                    <Text style={styling.totalMoney}>Total Price: {orderTotalPrice} vnd</Text>
                </View>
            </View>
        </View>
    );
};

export default ViewDetailOrder;

const styling = StyleSheet.create({
    container: {
        borderColor: "#644AB5",
        borderWidth: 2,
        margin: 10,
        borderRadius: 5,
        flex: 1,
        padding: 15,
        justifyContent: 'space-between'
    },
    header: {
        borderBottomColor: '#644AB5',
        borderBottomWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    orderName: {
        fontSize: 30,
        color: "#644AB5",
        fontWeight: "bold",
        paddingBottom: 5,
        textAlignVertical: 'center'
    },
    employeeName: {
        fontSize: 15,
        color: "#644AB5",
        fontWeight: "bold",
        textAlignVertical: 'center'
    },
    menuRegion: {
        marginTop: 10,
        flex: 1
    },
    orderItem: {
        margin: 5,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    itemName: {
        color: "#644AB5",
        fontSize: 22,
        fontWeight: "bold"
    },
    itemPrice: {
        color: "#644AB5",
        fontSize: 18
    },
    counter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 120
    },
    totalMoney: {
        fontSize: 25,
        color: "#644AB5",
        fontWeight: "bold",
        textAlign: "right"
    },
    statusBadge: {
        marginBottom: 7
    },
    itemQuantity: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#644AB5"
    },
    totalMoneyRegion: {
        borderTopColor: '#644AB5',
        borderTopWidth: 2,
        paddingRight: 5,
        paddingTop: 10
    }
})
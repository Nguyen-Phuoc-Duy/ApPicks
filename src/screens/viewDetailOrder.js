import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from "../context/authProvider";
import Badge from '../components/badge';
import { getColorStatus } from '../constant/status';
import color from '../constant/colorVariable';

const ViewDetailOrder = ({ navigation }) => {
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
                    {orderDetails && orderDetails.map((orderDetail) => (
                        <View key={orderDetail.ID} style={styling.orderItem}>
                            <View>
                                <Text style={styling.itemName}>{orderDetail.name}</Text>
                                <Text style={styling.itemPrice}>{orderDetail.price?.toLocaleString('en-gb')}/{orderDetail.unit}</Text>
                            </View>
                            <View style={styling.counter}>
                                <Text style={styling.itemQuantity}>Quantity: {orderDetail.quantity}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <View style={styling.totalMoneyRegion}>
                    <Text style={styling.totalMoney}>Total Price: {orderTotalPrice?.toLocaleString('en-gb')} vnđ</Text>
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
        justifyContent: 'space-between'
    },
    header: {
        borderBottomColor: color.primary,
        borderBottomWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    orderName: {
        fontSize: 30,
        color: color.primary,
        fontWeight: "bold",
        paddingBottom: 5,
        textAlignVertical: 'center'
    },
    employeeName: {
        fontSize: 15,
        color: color.primary,
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
        color: color.primary,
        fontSize: 22,
        fontWeight: "bold"
    },
    itemPrice: {
        color: color.primary,
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
        color: color.primary,
        fontWeight: "bold",
        textAlign: "right"
    },
    statusBadge: {
        marginBottom: 7
    },
    itemQuantity: {
        fontSize: 20,
        fontWeight: "bold",
        color: color.primary
    },
    totalMoneyRegion: {
        borderTopColor: color.primary,
        borderTopWidth: 2,
        paddingRight: 5,
        paddingTop: 10
    }
})
import { StyleSheet, Text, View, Pressable, TextInput, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import styles from "../css/style";
import { Ionicons } from "@expo/vector-icons";
import useAlert from "../hook/useAlert";
import Loader from "../components/loader";
import ModalMenu from "../components/modal/modalMenu";
import { AuthContext } from "../context/authProvider";
import Badge from "../components/badge";
import { getColorStatus } from "../constant/status";
import color from "../constant/colorVariable";

const DetailOrder = ({ navigation, route }) => {
	const [listProduct, setListProducts] = useState([]);
	const [menuProduts, setMenuProducts] = useState([]);
	const [totalBill, setTotalBill] = useState(0);
	const [changeQuantity, setChangeQuantity] = useState(false);
	const [changeDetail, setChangeDetail] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { order = {} } = route?.params || {}

	const { useFetch } = useContext(AuthContext);

	useEffect(() => {
		let { ID } = route?.params || {};
		const status = getColorStatus[order.status];
		navigation.setOptions({
			headerRight: () => ['started', 'inProgress'].includes(order.status) ? (
				<TouchableOpacity onPress={() => handleChangeStatus(ID, 'cancelled')}>
					<Text style={{ color: color.danger }}>Cancel</Text>
				</TouchableOpacity>
			) : '',
			headerLeft: () => <Badge label={order.status} color={status} />
		})
	}, [])

	const handleChangeStatus = async (ID, status) => {
		try {
			setIsLoading(true);
			let confirm;
			switch (status) {
				case 'cancelled':
					confirm = 'Are you sure you want to cancel order?';
					break;
					case 'inProgess':
					confirm = 'Are you sure you want to change order is InProgess status?';
					break;
				case 'finished':
					confirm = 'This order has Finished?';
					break;
				default:
					return ;
			}
			confirm = await useAlert.alertSync('Are you sure?', confirm);
			if (!confirm) return;
			if (confirm) {
				let result = await useFetch('orders/updateStatus', { ID, status }, 'POST')
				if (result.errCode === 200) {
					navigation.navigate({
						name: 'Detail Table',
						params: { ID: route?.params?.order?.tableId || '' }
					})
				}else {
					console.log(result);
				}
			}
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	}

	const getOrderDetails = async (ID) => {
		setIsLoading(true);
		const result = await useFetch('orders/getDetailOrder/' + ID);
		if (result.errCode === 200) {
			let details = result.data;
			setListProducts(details || [])
		} else {
			console.log(result)
		}
		setIsLoading(false);
	}

	useEffect(() => {
		if (route.params) {
			const { ID = '', menuProducts } = route.params;
			if (ID) {
				getOrderDetails(ID)
				setChangeQuantity(false);
				setChangeDetail(false);
			}
			if (menuProducts) {
				let menus = [];
				menuProducts.map(product => {
					menus.push({
						key: product.ID,
						value: product.name,
						disabled: product.isClose,
						price: product.price,
						isClose: product.isClose,
						unit: product.unit
					})
				})
				setMenuProducts(menus)
			}
		}
	}, [route?.params?.ID, route?.params?.menuProducts])

	useEffect(() => {
		let initBill = 0;

		(listProduct || []).map(product => {
			if (product) {
				initBill += product.price * product.quantity
			}
			return product.ID
		})
		setTotalBill(initBill)
	}, [listProduct])

	const checkChangeDetail = (newProducts) => {
		try {
			let { order: { products = [] } } = route.params;
			if (products.length !== newProducts.length) {
				setChangeQuantity(true);
			} else {
				let change = false;
				newProducts.map((product, index) => {
					if (products[index].quantity !== product.quantity) {
						change = true;
					}
				})
				setChangeQuantity(change);
			}
		} catch (err) {
			setChangeQuantity(false);
		}
	}

	const onCounterQuantity = async (ID, prefix) => {
		if (!ID) return;
		let newProducts = []
		for (let product of listProduct) {
			if (product?.ID === ID) {
				let func = new Function('quantity', 'return quantity ' + prefix + ' 1');
				let quantity = func(product.quantity || 1);
				if (quantity <= 0) {
					let title = 'Are you sure?';
					let message = `Are you sure you want to remove '${product.name}?'`;
					if (!(await useAlert.alertSync(title, message, true))) {
						newProducts.push(product);
					}
				} else {
					product.quantity = quantity
					newProducts.push(product);
				}
			} else {
				newProducts.push(product);
			}
		}
		checkChangeDetail(newProducts);
		setListProducts(newProducts || []);
	};

	const handleSubmitChange = async () => {
		let { order } = route.params;
		if (!order) return;
		setIsLoading(true);
		let data = Object.assign({}, order, { listProduct });
		let result = await useFetch('orders/update', data, 'POST');
		if (result.errCode === 200) {
			setChangeQuantity(false);
			setChangeDetail(true);
		} else {
			console.log(result)
		}
		setIsLoading(false);
	}

	const handleAddProducts = (value) => {
		let products = menuProduts.filter(p => value.includes(p.key));
		let newProducts = [...listProduct, ...products.map(p => ({
			ID: p.key,
			name: p.value,
			price: p.price,
			quantity: 1,
			unit: p.unit
		}))];
		checkChangeDetail(newProducts);
		setListProducts(newProducts);
		setModalVisible(false);
	}


	const setQuantityProduct = async (ID, value) => {
		let newProducts = listProduct;
		if (value <= 0) {
			let title = 'Are you sure?';
			let message = `Are you sure you want to remove this product?'`;
			if ((await useAlert.alertSync(title, message, true))) {
				newProducts = newProducts.filter(product => product.ID !== ID);
				return setListProducts(newProducts);
			}
		} else {
			newProducts = newProducts.map(product => {
				if (product.ID === ID) {
					product.quantity = value;
				}
				return product;
			})
			return setListProducts(newProducts);
		}
	}

	return (
		<View style={styling.container}>
			{isLoading && <Loader />}
			<View style={styling.header}>
				<Text style={styling.orderName}>{route?.params?.order?.name || 'Detail Order'}</Text>
				{['started', 'inProgess'].includes(order.status) ? (
					<View style={{ flexDirection: 'row' }}>
						{changeQuantity && (
							<TouchableOpacity style={styles.btnIcon}
								onPress={handleSubmitChange}>
								<Ionicons
									name="checkmark-outline"
									size={30}
									color={color.primary}
									style={styles.addIcon}
								/>
							</TouchableOpacity>
						)}
						<TouchableOpacity style={styles.btnIcon}
							onPress={() => setModalVisible(true)}>
							<Ionicons
								name="ios-add-circle-outline"
								size={30}
								color={color.primary}
								style={styles.addIcon}
							/>
						</TouchableOpacity>
					</View>
				) : (
					<Text style={styling.statusBadge}>
						<Badge label={order.status} color={getColorStatus[order.status]} />
					</Text>
				)}
			</View>
			<ScrollView style={styling.menuRegion}>
				{listProduct?.map(product => (
					<View key={product.ID} style={styling.orderItem}>
						<View>
							<Text style={styling.itemName}>{product.name}</Text>
							<Text style={styling.itemPrice}>{product.price?.toLocaleString('en-gb')}/{product.unit}</Text>
						</View>
						<View style={styling.counter}>
							{['started', 'inProgess'].includes(order.status) ? (
								<>
									<TouchableOpacity style={styling.counterContent}
										onPress={() => onCounterQuantity(product.ID, '-')}>
										<Text>-</Text>
									</TouchableOpacity>
									<TextInput
										keyboardType='numeric'
										style={styling.input}
										maxLength={100}
										value={(product?.quantity || 1) + ""}
										caretHidden={true}
										onChangeText={(value) => setQuantityProduct(product.ID, value)}
									/>
									<TouchableOpacity style={styling.counterContent}
										onPress={() => onCounterQuantity(product.ID, '+')}>
										<Text>+</Text>
									</TouchableOpacity>
								</>
							) : <Text style={{ color: color.primary, fontSize: 20 }}>Quantity: {product.quantity}</Text>}
						</View>
					</View>
				))}
			</ScrollView>
			<View style={styling.checkoutRegion}>
				<Text style={styling.totalMoney}>Total: {totalBill?.toLocaleString('en-gb')}đ</Text>
				<View style={styling.actionButtons}>
					<TouchableOpacity style={styling.button}
						onPress={() => {
							let opts = {
								name: 'Detail Table'
							}
							if (changeDetail) {
								opts.params = { ID: route?.params?.order?.tableId || '' }
							}
							navigation.navigate(opts)
						}}
					>
						<Text style={styling.buttonText}>Back</Text>
					</TouchableOpacity>
					{['started', 'inProgess'].includes(order.status) && (
						<TouchableOpacity style={styling.button} onPress={() => handleChangeStatus(order.ID, 'finished')}>
							<Text style={styling.buttonText}>Checkout</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
			{modalVisible && <ModalMenu setModalVisible={setModalVisible} menus={menuProduts}
				disabledList={listProduct.map(p => p.ID)} handleAddProducts={handleAddProducts} />}
		</View>
	)
};

export default DetailOrder;

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
	input: {
		borderColor: color.primary,
		color: color.primary,
		borderWidth: 2,
		width: 30,
		padding: 0,
		textAlign: "center",
		borderRadius: 3
	},
	header: {
		borderBottomColor: color.primary,
		borderBottomWidth: 2,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
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
		borderBottomColor: color.primary,
		borderBottomWidth: 2,
		paddingBottom: 10,
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
	},
	checkoutRegion: {
		padding: 10,
	},
	totalMoney: {
		fontSize: 22,
		color: color.primary,
		fontWeight: "bold",
		textAlign: "right"
	},
	actionButtons: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20
	},
	button: {
		backgroundColor: color.primary,
		width: 155,
		height: 40,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		//textAlign: 'center',
		//textAlignVertical: 'center'
	},
	counterContent: {
		padding: 15,
		borderRadius: 5
	}
})
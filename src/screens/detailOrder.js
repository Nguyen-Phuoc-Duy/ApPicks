import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import styles from "../css/style";
const DetailOrder = () => {

	const [quantity, setQuantity] = useState(1);

	const onMinusPress = () => {
		if (quantity > 1) {
			setQuantity(prevCount => prevCount - 1);
		}
	};

	const onPlusPress = () => {
		setQuantity(prevCount => prevCount + 1);
	};

	return (
		<ScrollView>
			<View style={styling.container}>
				<View style={styling.header}>
					<Text style={styling.orderName}>Order 1</Text>
					<Text style={styling.employeeName}>Employee1</Text>
				</View>
				<View style={styling.menuRegion}>
					<View style={styling.orderItem}>
						<View>
							<Text style={styling.itemName}>Bia</Text>
							<Text style={styling.itemPrice}>20000/chai</Text>
						</View>
						<View style={styling.counter}>
							<Pressable onPress={onMinusPress}>
								<Text style={styling.counterContent}>-</Text>
							</Pressable>
							<TextInput
								keyboardType='numeric'
								style={styling.input}
								maxLength={2}
								defaultValue="1"
								caretHidden={true}
							/>
							<Pressable onPress={onPlusPress}>
								<Text style={styling.counterContent}>+</Text>
							</Pressable>
						</View>
					</View>
					<View style={styling.orderItem}>
						<View>
							<Text style={styling.itemName}>Bia</Text>
							<Text style={styling.itemPrice}>20000/chai</Text>
						</View>
						<View style={styling.counter}>
							<Pressable onPress={onMinusPress}>
								<Text style={styling.counterContent}>-</Text>
							</Pressable>
							<TextInput
								keyboardType='numeric'
								style={styling.input}
								maxLength={2}
								defaultValue="1"
								caretHidden={true}
							/>
							<Pressable onPress={onPlusPress}>
								<Text style={styling.counterContent}>+</Text>
							</Pressable>
						</View>
					</View>
					<View style={styling.orderItem}>
						<View>
							<Text style={styling.itemName}>Bia</Text>
							<Text style={styling.itemPrice}>20000/chai</Text>
						</View>
						<View style={styling.counter}>
							<Pressable onPress={onMinusPress}>
								<Text style={styling.counterContent}>-</Text>
							</Pressable>
							<TextInput
								keyboardType='numeric'
								style={styling.input}
								maxLength={2}
								defaultValue="1"
								caretHidden={true}
							/>
							<Pressable onPress={onPlusPress}>
								<Text style={styling.counterContent}>+</Text>
							</Pressable>
						</View>
					</View>
				</View>
				<View style={styling.checkoutRegion}>
					<Text style={styling.totalMoney}>Total: 100000d</Text>
					<View style={styling.actionButtons}>
						<Pressable style={styling.button}>
							<Text style={styling.buttonText}>Cancel</Text>
						</Pressable>

						<Pressable style={styling.button}>
							<Text style={styling.buttonText}>Checkout</Text>
						</Pressable>
					</View>
				</View>
			</View>



			<View style={styling.container}>
				<View style={styling.header}>
					<Text style={styling.orderName}>Order 2</Text>
					<Text style={styling.employeeName}>Employee2</Text>
				</View>
				<View style={styling.menuRegion}>
					<View style={styling.orderItem}>
						<View>
							<Text style={styling.itemName}>Bia</Text>
							<Text style={styling.itemPrice}>20000/chai</Text>
						</View>
						<View style={styling.counter}>
							<Pressable onPress={onMinusPress}>
								<Text style={styling.counterContent}>-</Text>
							</Pressable>
							<TextInput
								keyboardType='numeric'
								style={styling.input}
								maxLength={2}
								defaultValue="1"
								caretHidden={true}
							/>
							<Pressable onPress={onPlusPress}>
								<Text style={styling.counterContent}>+</Text>
							</Pressable>
						</View>
					</View>
					<View style={styling.orderItem}>
						<View>
							<Text style={styling.itemName}>Bia</Text>
							<Text style={styling.itemPrice}>20000/chai</Text>
						</View>
						<View style={styling.counter}>
							<Pressable onPress={onMinusPress}>
								<Text style={styling.counterContent}>-</Text>
							</Pressable>
							<TextInput
								keyboardType='numeric'
								style={styling.input}
								maxLength={2}
								defaultValue="1"
								caretHidden={true}
							/>
							<Pressable onPress={onPlusPress}>
								<Text style={styling.counterContent}>+</Text>
							</Pressable>
						</View>
					</View>
				</View>
				<View style={styling.checkoutRegion}>
					<Text style={styling.totalMoney}>Total: 40000d</Text>
					<View style={styling.actionButtons}>
						<Pressable style={styling.button}>
							<Text style={styling.buttonText}>Cancel</Text>
						</Pressable>

						<Pressable style={styling.button}>
							<Text style={styling.buttonText}>Checkout</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default DetailOrder;

const styling = StyleSheet.create({
	container: {
		borderColor: "#644AB5",
		borderWidth: 2,
		margin: 10,
		borderRadius: 5,
		flex: 1,
		padding: 15
	},
	input: {
		borderColor: "#644AB5",
		color: "#644AB5",
		borderWidth: 2,
		width: 30,
		padding: 0,
		textAlign: "center",
		borderRadius: 3
	},
	header: {
		borderBottomColor: '#644AB5',
		borderBottomWidth: 2,
		flexDirection: 'row',
		justifyContent: 'space-between'
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
		borderBottomColor: '#644AB5',
		borderBottomWidth: 2,
		paddingBottom: 10
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
		width: 80
	},
	checkoutRegion: {
		padding: 10
	},
	totalMoney: {
		fontSize: 22,
		color: "#644AB5",
		fontWeight: "bold",
		textAlign: "right"
	},
	actionButtons: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20
	},
	button: {
		backgroundColor: "#644AB5",
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
	}
})

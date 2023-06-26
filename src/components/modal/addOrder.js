import { useContext, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import styles from '../../css/style';
import useAlert from '../../hook/useAlert';
import { AuthContext } from '../../context/authProvider';
import Loader from '../loader';


const ModalAddOrder = ({ setModalVisible, menus = [], tableId, addOrder }) => {
    const [name,setName] = useState('');
    const [selected, setSelected] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    
    const { useFetch } = useContext(AuthContext);

    const onCounterQuantity = (ID, prefix) => {
        try {
            if (!ID || !selected[ID]) return;
            let newSelected = {...selected};
            const func = new Function('input', `return input ${prefix} 1`);
            let value = func(selected[ID]);
            newSelected[ID] = value;
            setSelected(newSelected);
        } catch(err) {
            console.log(err);
        }
    }

    const handleChooseItem = (ID) => {
        let newSelected = {...selected};
        if (selected[ID]){
            newSelected[ID] = 0;
            setSelected(newSelected);
        }else {
            newSelected[ID] = 1;
            setSelected(newSelected);
        }
    }

    const handleCreateOrder = async () => {
        if (!name) {
            useAlert.alert('Name is required!', 'Please enter a name!');
            return;
        }
        let products = [];
        for (let [key,value] of Object.entries(selected)) {
            if(value){
                let item = menus.find(item => item.ID === key);
                if(item){
                    item.quantity = value;
                    products.push(item);
                }
            }
        }
        if (products.length <= 0) {
            useAlert.alert('Products is required!', 'Please choose product greater than 0!');
            return;
        }
        if (!tableId) {
            useAlert.alert('Table not found!', 'Please reload and try again!');
            return;
        }

        try {
            setIsLoading(true);
            let result = await useFetch('orders/create', { name, tableId, listProduct: products }, 'POST');
            if (result.errCode === 200) {
                if (addOrder) {
                    addOrder(result.data);
                }
            }else {
                console.log(result);
            }
        } catch(err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            {isLoading && <Loader />}
            <View style={styling.modalView1}>
                <TextInput style={styling.inputTextHeader} placeholder='New Order' value={name}
                    onChangeText={setName}
                />
                <ScrollView>
                    {menus?.map(item => (
                        <TouchableOpacity key={item.ID} style={{...styling.itemBox, ...((selected[item?.ID] || item.isClose) ? styling.itemSelected : {})}}
                            disabled={item.isClose} onPress={() => handleChooseItem(item.ID)}
                        >
                            <Text style={selected[item?.ID] ? styling.itemSelected : {}}>{item?.name || ''}</Text>
                            {selected[item?.ID] ? (
                                <View style={styling.counter}>
                                    <TouchableOpacity style={styling.counterContent} 
                                    onPress={() => onCounterQuantity(item.ID, '-')}>
                                        <Text>-</Text>
                                    </TouchableOpacity>
                                    <TextInput
                                        editable={false}
                                        keyboardType='numeric'
                                        style={styling.input}
                                        maxLength={100}
                                        value={(selected[item?.ID] || 1) + ""}
                                        caretHidden={true}
                                    />
                                    <TouchableOpacity style={styling.counterContent} 
                                    onPress={() => onCounterQuantity(item.ID, '+')}>
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={styles.btnGrMenu}>
                    <TouchableOpacity style={styling.button}
                        onPress={handleCreateOrder}
                    >
                        <Text style={styling.buttonText}>Create</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styling.button}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styling.buttonText}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalAddOrder;

const styling = StyleSheet.create({
    modalView1: {
        backgroundColor: "#fff",
        height: "100%",
        paddingVertical: 30,
        paddingHorizontal: 30,
        // alignItems: "center",
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
	},
    inputTextHeader: {
        color: "#644AB5",
        fontSize: 25,
        padding: 10,
        borderBottomWidth: 0.5,
        borderColor: '#644AB5'
    },
    itemBox: {
        marginTop: 10,
        backgroundColor: "rgb(247, 248, 248)",
        height: 60,
        display: "flex",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    itemSelected: {
        backgroundColor: "rgb(218, 218, 218)",
    },
    input: {
		color: "#644AB5",
		width: 30,
		padding: 0,
        fontSize: 18,
		textAlign: "center",
		borderRadius: 3
	},
    counter: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: 80
	},
    counterContent: {
		padding: 10,
		paddingTop: 5,
		paddingBottom: 5,
		borderRadius: 5
	}
})
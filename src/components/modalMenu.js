import { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../css/style';
import { MultipleSelectList } from 'react-native-dropdown-select-list';


const ModalMenu = ({ setModalVisible, menus = [], disabledList = [], handleAddProducts }) => {

    const [selected, setSelected] = useState([]);
    const [options,setOptions] = useState(menus);

    useEffect(() => {
		let newMenus = []
		menus.map(product => {
			newMenus.push({
				key: product.key,
				value: product.value,
				disabled: product.isClose || disabledList.includes(product.key),
				price: product.price,
				isClose: product.isClose,
				unit: product.unit
			})
		})
		setOptions(newMenus)
    },[menus, disabledList])

    const handleSave = () => {
        handleAddProducts(selected);
        setModalVisible(false);
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
            <View>
            <View style={styles.modalView1}>
                <Text style={styles.text1}>Menu</Text>
                <TouchableOpacity style={styles.menuContainer}>
                    <View style={styles.menuContainerContent}>
                        <MultipleSelectList
                            setSelected={setSelected}
                            data={options}
                            label="Categories"
                            di
                            save="key"
                            notFoundText="No data existx"
                        />
                    </View>
                    <View style={styles.btnGrMenu}>
                        <TouchableOpacity style={styling.button}
                            onPress={handleSave}
                        >
                            <Text style={styling.buttonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styling.button}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styling.buttonText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>
    )
}

export default ModalMenu;

const styling = StyleSheet.create({
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
	}
})
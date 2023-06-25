import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { TouchableOpacity, Text, TextInput, View } from 'react-native';
import styles from '../../css/style';
import { Modal } from 'react-native';


const ModalAddTable = ({ setModalVisible }) => {

    return (
        <Modal
            animationType="slide"
            visible={true}
            onRequestClose={() => {
                setModalVisible(false);
            }}>
            <View style={styles.viewAddTable}>
                <Text style={styles.text1}>Bàn: </Text>
                <TextInput placeholder="Name" style={styles.textInput} />
                <View style={styles.btnGrMenu}>
                    <TouchableOpacity
                        style={styles.btnIcon}
                        // onPress={() => navigation.navigate("Tables", { name: "12" })}
                    >
                        <Ionicons
                            name="checkmark-done-circle-outline"
                            size={30}
                            color={"#644AB5"}
                            style={styles.addIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnIcon}
                        onPress={() => setModalVisible(false)}
                    >
                        <Ionicons
                            name="close-circle-outline"
                            size={30}
                            color={"#644AB5"}
                            style={styles.addIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalAddTable;
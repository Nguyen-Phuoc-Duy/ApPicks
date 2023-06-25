import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { TouchableOpacity, Text, TextInput, View } from 'react-native';
import styles from '../../css/style';
import { Modal } from 'react-native';
import { AuthContext } from '../../context/authProvider';
import Loader from '../loader';


const ModalAddTable = ({ setModalVisible, onAdd }) => {
    const [isLoading,setIsLoading] = useState(false);
    const [nameTable, setNameTable] = useState('');

    const { useFetch } = useContext(AuthContext);

    const handleAddTable = async () => {
        try {
            if (nameTable) {
                setIsLoading(true);
                let result = await useFetch('admin/createTable', { name: nameTable }, 'POST');
                if (result.errCode === 200) {
                    result = result.data;
                    onAdd(prev => {
                        if (prev && Array.isArray(prev)) {
                            prev.push(result);
                            return [...prev];
                        }
                        return prev;
                    })
                }
            }
        } finally {
            setModalVisible(false);
            setIsLoading(false);
        }
    }

    return (
        <Modal
            animationType="slide"
            visible={true}
            onRequestClose={() => {
                setModalVisible(false);
            }}>
                {isLoading && <Loader />}
            <View style={styles.viewAddTable}>
                <Text style={styles.text1}>Bàn: </Text>
                <TextInput placeholder="Name" style={styles.textInput} onChangeText={setNameTable} value={nameTable} />
                <View style={styles.btnGrMenu}>
                    <TouchableOpacity
                        style={styles.btnIcon}
                        onPress={handleAddTable}
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
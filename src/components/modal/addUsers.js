import Loader from "../loader"
import { useContext, useState } from "react"
import loginStyles from "../../css/login"
import InputCustom from "../inputCustom"
import { Modal, TouchableOpacity, SafeAreaView, View, Text } from "react-native"
import useAlert from "../../hook/useAlert"
import checkEmail from "../../helpers/checkEmail"
import { AuthContext } from "../../context/authProvider"


const ModalAddUsers = ({ setModalVisible, addNewUser }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formValue, setFormValue] = useState({});

    const { useFetch } = useContext(AuthContext);

    const handleChangeValueForm = (field,value) => {
        formValue[field] = value;
        setFormValue(formValue);
    }

    const handleSubmitForm = async () => {
        try {
            setIsLoading(true);
            let { email, name, password } = formValue;

            if (!email || !name || !password) {
                useAlert.alert('Thiếu thông tin', 'Vui lòng nhập đủ thông tin!');
                return;
            } else if (password !== formValue['Re-password']) {
                useAlert.alert('Sai mật khẩu', 'Mật khẩu không khớp!');
                return;
            } else if (!checkEmail(email)) {
                useAlert.alert('Sai email', 'Email sai định dạng!');
                return;
            } else {
                const result = await useFetch('admin/createUser', formValue, 'POST');
                if (result.errCode === 200) {
                    addNewUser(result.data);
                    setModalVisible(false);
                } else {
                    useAlert.alert('Error', result.errMsg);
                }
            }
        } catch (e) {
            console.log(e);
            useAlert.alert('Error', e.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal 
            animationType="slide"
            visible={true}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <SafeAreaView style={loginStyles.root}>
                {isLoading && <Loader />}
                <View style={loginStyles.container}>
                    <Text style={loginStyles.title}>New user</Text>
                    <View style={loginStyles.form}>
                        <InputCustom label='Email' placeholder='VD: thanh@gmail.com' required
                            value={formValue.email} onChange={(value) => handleChangeValueForm('email',value)}
                        />
                        <InputCustom name='name' label='Name' required
                            value={formValue.name} onChange={(value) => handleChangeValueForm('name',value)}
                        />
                        <InputCustom name='password' label='Password' type='password' placeholder='Password'
                            value={formValue.password} onChange={(value) => handleChangeValueForm('password',value)}
                            required
                        />
                        <InputCustom name='Re-password' label='Confirm password' type='password'    placeholder='Confirm password'
                            value={formValue['Re-password']} onChange={(value) => handleChangeValueForm('Re-password',value)}
                            required
                        />
                        <View style={loginStyles.grButton}>
                            <TouchableOpacity
                                style={loginStyles.button} 
                                onPress={() => setModalVisible(false)}>
                                <Text style={{ color: 'white' }}>
                                    Back
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={loginStyles.button} 
                                onPress={handleSubmitForm}>
                                <Text style={{ color: 'white' }}>
                                    Create
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    )
}

export default ModalAddUsers
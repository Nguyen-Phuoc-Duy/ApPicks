import { SafeAreaView, TextInput, View, Text, TouchableOpacity } from "react-native";
import { useContext, useState } from "react"
import { AuthContext } from "../context/authProvider"
import loginStyles from "../css/login";


const AccountInfo = (props) => {
    const { user } = useContext(AuthContext);

    const [formValue,setFormValue] = useState({
        name: user?.name || '',
        password: '',
        'Re-password': ''
    })

    const handleChangeValueForm = (field,value) => {
        let newForm = {...formValue};
        newForm[field] = value;
        setFormValue(newForm);
    }
    
    const handleSubmitForm = () => {}

    return (
        <SafeAreaView style={loginStyles.root}>
            <View style={loginStyles.container}>
                <View style={loginStyles.form}>
                    <TextInput editable={false} style={loginStyles.inputDisabled} value={user.email} />
                    <TextInput style={loginStyles.input} placeholder='Name*'
                        value={formValue.name}
                        onChangeText={(value) => handleChangeValueForm('name',value)} />
                    <TextInput style={loginStyles.input} placeholder='Password*' autoCompleteType="password" 
                        secureTextEntry autoCorrect={false} value={formValue.password}
                        onChangeText={(value) => handleChangeValueForm('password',value)}
                    />
                    <TextInput style={loginStyles.input} placeholder='Confirm password' secureTextEntry autoCorrect={false} value={formValue['Re-password']}
                        onChangeText={(value) => handleChangeValueForm('Re-password',value)} />
                    <TouchableOpacity
                        style={{...loginStyles.button, ...loginStyles.alignCenter}} 
                        onPress={handleSubmitForm}>
                        <Text style={{ color: 'white' }}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AccountInfo;
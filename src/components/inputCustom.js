import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, TextInput, View } from 'react-native';

const InputCustom = ({ formValue = {}, name, value, type = 'input', placeholder, onChange, color = "black", label, iconPrefix, rule, errMsg, required, disabled }) => {
    const [stateValue, setStateValue] = useState(value);
    const [secureText, setSecureText] = useState(() => ['password', 'Re-password'].includes(type) ? true : false);
    const [focus, setFocus] = useState(false);

    useEffect(() => {
        if (value !== stateValue) {
            setStateValue(value);
        }
    },[value])

    const handleChangeText = (text) => {
        setStateValue(text);
        onChange?.(text);
    }

    const styleWrapperInput = useMemo(() => {
        let initStyle = { ...style.wrapperInput };
        if (focus) {
            Object.assign(initStyle, style.inputFocus);
        }
        if (errMsg) {
            Object.assign(initStyle, style.inputError);
        }
        if (disabled) {
            initStyle.backgroundColor = '#9999';
        }
        return initStyle;
    },[focus, disabled, errMsg])

    return (
        <SafeAreaView style={style.root}>
            {label && (
                <Text style={Object.assign({},style.label,{ color })}>
                    {label}: {required ? <Text style={{ color: 'red' }}>*</Text> : ''}
                </Text>
            )}
            <View style={styleWrapperInput}>
                <TextInput key={name} style={style.input} editable={!disabled} placeholder={placeholder || name} autoCompleteType={type}
                    secureTextEntry={secureText} autoCorrect={!secureText}
                    onChangeText={(_value) => handleChangeText(_value)}
                    onBlur={() => setFocus(false)}
                    onFocus={() => setFocus(true)}
                    value={stateValue}
                />
                {!disabled && ['password', 'Re-password'].includes(type) && (
                    <TouchableOpacity style={style.icon} onPress={() => setSecureText(!secureText)}>
                        <Ionicons 
                            name={secureText ? 'eye-outline' : 'eye-off-outline'}
                            color='#999'
                            size={20}
                        />
                    </TouchableOpacity>
                )}
                {iconPrefix && (
                    <View style={style.icon}>
                        {iconPrefix}
                    </View>
                )}
            </View>
            {errMsg && (
                <Text style={{...style.label, color: 'red'}}>{errMsg}</Text>
            )}
        </SafeAreaView>
    )

}

export default InputCustom;

const buttonColor = 'rgb(30, 150, 255)';
const disbabledColor = 'rgb(180, 180, 180)';
const borderRadius = 20;
const borderColor = '#999999';

const style = StyleSheet.create({
    root: {
    },
    wrapperInput: {
        borderColor: 'transparent',
        borderWidth: 1,
        borderBottomColor: borderColor,
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputFocus: {
        borderWidth: 1,
        borderColor: buttonColor,
        borderBottomColor: buttonColor,
        borderRadius: borderRadius,
    },
    inputError: {
        borderColor: 'red',
        borderRadius: borderRadius,
        borderBottomColor: 'red'
    },
    input: {
        flex: 1,
        padding: 10
    },
    label: {
        textTransform: 'capitalize',
        fontSize: 12,
        marginVertical: 5
    },
    icon: {
        padding: 10,
    },
    iconPrefix: {

    }
})
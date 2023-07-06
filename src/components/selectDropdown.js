import { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet } from 'react-native'; 
import color from '../constant/colorVariable';

const SelectDropdown = ({ children, options = [], defaultValue, onChange, placement = 'right', value}) => {
    const [showMenu, setShowMenu] = useState(false);
    const [stateValue, setStateValue] = useState(value || defaultValue || '')

    const handleSelect = (_value) => {
        if (stateValue !== _value) {
            !value && setStateValue(_value)
            onChange?.(_value)
        }
        setShowMenu(false)
    }

    useEffect(() => {
        if (value) {
            setStateValue(value);
        }
    },[value])

    useEffect(() => {
        if (defaultValue && !stateValue) {
            setStateValue(defaultValue)
        }
    },[defaultValue])

    const setActive = useCallback((v) => {
        if (v === stateValue) {
            return {
                backgroundColor: color.primary,
                color: color.primaryText,
                padding: 5
            }
        } else {
            return {
                backgroundColor: color.primaryText,
                color: color.primary,
                borderTopWidth: 0.5,
                borderTopColor: '#818181',
                padding: 5
            }
        }
    },[stateValue])

    return (
        <SafeAreaView style={styles.root}>
            <TouchableOpacity onPress={() => setShowMenu(!showMenu)} style={styles.view}>
                {children}
            </TouchableOpacity>
            {options && (
                <View style={Object.assign({},styles.menu, showMenu ? styles.show : {}, styles[placement])}>
                    {options.map(option => (
                        <TouchableOpacity key={option.value}
                        onPress={() => handleSelect(option.value)}
                        ><Text style={setActive(option.value)}>{option.label}</Text></TouchableOpacity>
                    ))}
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    root: {
        position: 'relative',
        marginHorizontal: 20,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    menu: {
        position: 'absolute',
        backgroundColor: color.primaryText,
        width: 150,
        height: 'auto',
        borderColor: '#818181',
        borderWidth: 0.5,
        display: 'none',
    },
    show: {
        padding: 10,
        display: 'flex'
    },
    right: {
        top: '100%',
        right: 0,
    },
     left: {
        top: '100%',
        left: 0,
    },
    center: {
        top: '100%',
        left: 0,
        right: 0
    }
})

export default SelectDropdown;
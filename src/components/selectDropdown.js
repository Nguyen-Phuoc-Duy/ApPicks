import { useState, useEffect, useMemo } from 'react';
import { SafeAreaView, TouchableOpacity, View, Text } from 'react-native'; 

const SelectDropdown = ({ children, options = [], defaultValue, onChange }) => {

    const [stateValue, setStateValue] = useState(defaultValue || '')

    const handleSelect = (value) => {
        setStateValue(value)
        onChange?.(value)
    }

    const setActive = useMemo((v) => {
        if (v === stateValue) {
            return {

            }
        } else {
            
        }
    },[stateValue])

    return (
        <SafeAreaView>
            <TouchableOpacity>
                {children}
            </TouchableOpacity>
            <View>
                {options && options.map(option => (
                    <TouchableOpacity key={option.value} 
                    onPress={() => handleSelect(option.value)}
                    >{option.label}</TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    )
}
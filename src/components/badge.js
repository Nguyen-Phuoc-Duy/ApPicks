import { View, Text, StyleSheet } from 'react-native';
import color from '../constant/colorVariable';

const Badge = ({ label = 'Badge', color = 'info'}) => {

    return (
        <View style={badgeStyle.root}>
            <Text style={badgeStyle[color] || badgeStyle.info}>{label}</Text>
        </View>
    )
}

export default Badge;


const badgeStyle = StyleSheet.create({
    root: {
        padding: 6,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 15,
        backgroundColor: 'white'
    },
    danger: {
        color: color.danger,
        fontSize: 11
    },
    warning: {
        color: color.warning,
        fontSize: 11
    },
    success: {
        color: color.success,
        fontSize: 11
    },
    info: {
        color: color.second,
        fontSize: 11
    }
})
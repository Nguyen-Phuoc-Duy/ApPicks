import { View, Text, StyleSheet } from 'react-native';

const Badge = ({ label = 'Badge', color = 'info' }) => {

    return (
        <View style={{ ...badgeStyle.root, ...(badgeStyle[color] || badgeStyle.info) }}>
            <Text style={{ color: 'white', fontSize: 16 }}>{label}</Text>
        </View>
    )
}

export default Badge;


const badgeStyle = StyleSheet.create({
    root: {
        padding: 6,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 15
    },
    danger: {
        backgroundColor: 'rgb(255, 70, 70)',
    },
    warning: {
        backgroundColor: 'rgb(255, 162, 63)',
    },
    success: {
        backgroundColor: 'rgb(32, 195, 0)',
    },
    info: {
        backgroundColor: 'rgb(0, 140, 255)'
    }
})
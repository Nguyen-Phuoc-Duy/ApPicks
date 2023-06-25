import { StyleSheet } from "react-native";

const buttonColor = 'rgb(30, 150, 255)';
const disbabledColor = 'rgb(180, 180, 180)';
const borderRadius = 20;

const loginStyles = StyleSheet.create({
    root: {
        display: 'flex',
        padding: 10,
        paddingTop: 40
    },
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: "black",
        fontSize: 35,
        fontWeight: 800,
        padding: 15,
        textTransform: "capitalize",
    },
    form: {
        width: '100%',
        gap: 15
    },
    input: {
        width: '100%',
        borderColor: '#999999',
        borderWidth: 1,
        borderRadius: borderRadius,
        padding: 12,
    },
    textLink: {
        color: 'blue',
        fontStyle: 'italic',
        fontSize: 12,
    },
    textError: {
        color: 'red',
        fontSize: 12,
    },
    alignRight: {
        alignSelf: 'flex-end'
    },
    alignLeft: {
        alignSelf: 'flex-start'
    },
    alignCenter: {
        alignSelf: 'center'
    },
    fullWidth: {
        width: '100%'
    },
    button: {
        width: '30%',
        padding: 15,
        borderRadius: borderRadius,
        backgroundColor: buttonColor,
        alignItems: 'center',
    },
    disabled: {
        backgroundColor: disbabledColor
    },
    inputDisabled: {
        width: '100%',
        borderColor: '#999999',
        borderBottomWidth: 1,
        padding: 12,
        color: '#644AB5'
    }
})

export default loginStyles;
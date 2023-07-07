import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";


const Loader = (props) => {

    return (
        <SafeAreaView style={style.container}>
            <ActivityIndicator size="large" />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        zIndex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(230, 230, 230, 0.8)'
    }
})

export default Loader;
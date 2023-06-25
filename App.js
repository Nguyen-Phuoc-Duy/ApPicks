import AuthProvider from "./src/context/authProvider";
import Home from "./src/apps";
import { SafeAreaView, StyleSheet } from "react-native";
export default function App() {
  
  return (
    <SafeAreaView style={style.root}>
        <AuthProvider>
          <Home />
        </AuthProvider>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box'
  }
})

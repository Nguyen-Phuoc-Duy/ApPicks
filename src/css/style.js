import { StyleSheet } from "react-native";
import color from "../constant/colorVariable";
const styles = StyleSheet.create({
  defaultLayout: {
    display: "flex",
    padding: 10,
    paddingTop: 40,
  },
  textDel: {
    fontSize: 20,
    fontWeight: 600,
    color: "gray",
  },
  box: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "#c3c3c3",
    height: 80,
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
    borderRadius: 10,
  },
  text1: {
    color: color.primary,
    fontSize: 25,
    fontWeight: 700,
    padding: 10,
  },
  text2: {
    color: color.primary,
    fontSize: 20,
  },
  boxRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-evenly",
    flex: 1,
  },
  boxLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
    marginHorizontal: 50,
  },
  modalView: {
    marginVertical: 100,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView1: {
    backgroundColor: "#fff",
    height: "100%",
    paddingVertical: 30,
    paddingHorizontal: 30,
    // alignItems: "center",
  },
  modalView2: {
    marginVertical: 100,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    display: "flex",
    alignItems: "center",
    alignContent: "center",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginLeft: 180,
    display: "flex",
    alignItems: "center",
    width: 40,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    marginHorizontal: 20,
  },
  inner: {
    padding: 24,
    flex: 1,
  },
  inner2: {
    padding: 24,
    flex: 1,
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    height: 50,
  },
  btnContainer: {
    backgroundColor: "black",
    color: "red",
    marginTop: 12,
  },
  title_exit: {
    display: "flex",
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    display: "flex",
    alignItems: "center",
    alignContent: "center",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    marginLeft: 180,
    display: "flex",
    alignItems: "center",
    width: 40,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
  title_exit: {
    display: "flex",
    flexDirection: "row",
  },
  addIconContainer: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  addIcon: {
    marginVertical: 10,
    // marginRight: 20
  },
  boxTable: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: color.primary,
    height: 80,
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  textTable: {
    color: color.primaryText,
    fontSize: 25,
    fontWeight: 700,
  },
  viewAddTable: {
    marginHorizontal: 20,
    marginVertical: 30,
  },
  menu: {
    height: "82%",
  },
  btnGrMenu: {
    marginVertical: 20,
    marginBottom: 30,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  btnMenu: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
  },
  menuContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "space-around",
    alignItems: "stretch",
    // backgroundColor: "green",
    flex: 1,
  },
  menuContainerContent: {
    flex: 2,
    marginVertical: 20,
  },
  btnIcon: {
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 99,
    backgroundColor: "transparent",
  },
  btnLogout: {
    color: "red",
  },
  containerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boxIcon: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  body: {
    marginBottom: 20,
  },
});

export default styles;

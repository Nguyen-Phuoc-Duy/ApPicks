import { Alert } from "react-native";

const useAlert = {
    alertSync: (title, message, btnCancel = true) => {
        return new Promise((resolve, reject) => {
            let btn = [
                {
                    text: "Yes",
                    onPress: () => {
                        resolve(true);
                    },
                }
            ]
            if(btnCancel) {
                btn.push({
                    text: "Cancel",
                    onPress: () => {
                        resolve(false);
                    },
                })
            }
            Alert.alert(
                title,
                message,
                btn
              );
        })
    },
    alert: (title, message) => {
        return Alert.alert(
            title,
            message,
            [
              {
                text: "OK",
              }
            ]
          );
    }
}

export default useAlert;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, View } from "react-native";

export default function LogoutScreen() {
  const router = useRouter();

  useEffect(() => {
    Alert.alert(
      "Logout",
      "Do you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            router.replace("/(tabs)");
          },
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("accessToken");
            await AsyncStorage.removeItem("refreshToken");

            router.replace("/login");
          },
        },
      ],
      { cancelable: false },
    );
  });

  return <View />;
}

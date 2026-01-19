import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter username and password");
      return;
    }

    try {
      const response = await axios.post("http://192.168.1.79:8000/api/token/", {
        username,
        password,
      });

      const { access, refresh } = response.data;

      await AsyncStorage.setItem("accessToken", access);
      await AsyncStorage.setItem("refreshToken", refresh);

      //   await AsyncStorage.setItem("accessToken", "123sdfg");
      //   await AsyncStorage.setItem("refreshToken", "123dfgh");

      Alert.alert("Success", "Login successful");

      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.detail || "Invalid credentials",
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, backgroundColor: "#F0FDF4" }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 24,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: "#064E3B",
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Welcome Back 🌱
        </Text>

        <Text
          style={{
            color: "#166534",
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          Login to continue
        </Text>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#4D7C0F"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          style={{
            borderWidth: 1,
            borderColor: "#86EFAC",
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            padding: 14,
            marginBottom: 16,
          }}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#4D7C0F"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          style={{
            borderWidth: 1,
            borderColor: "#86EFAC",
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            padding: 14,
            marginBottom: 24,
          }}
        />

        <TouchableOpacity
          onPress={handleLogin}
          activeOpacity={0.8}
          style={{
            backgroundColor: "#16A34A",
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <Link
          href="/signup"
          style={{
            marginTop: 24,
            textAlign: "center",
            color: "#166534",
            fontWeight: "500",
          }}
        >
          Don’t have an account? Sign up
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

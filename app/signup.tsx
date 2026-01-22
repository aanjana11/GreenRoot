import { api } from "@/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        router.replace("/(tabs)");
      }
    };

    checkAuth();
  });

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      await api.post("/api/auth/signup/", {
        username,
        password,
      });

      Alert.alert("Success", "Account created successfully");

      // ✅ Go to login screen
      router.replace("/login");
    } catch (error: any) {
      Alert.alert(
        "Signup Failed",
        error.response?.data?.error || "Something went wrong",
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
        {/* Title */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: "#064E3B",
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Create Account 🌱
        </Text>

        <Text
          style={{
            color: "#166534",
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          Signup to get started
        </Text>

        {/* Username */}
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

        {/* Password */}
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

        {/* Button */}
        <TouchableOpacity
          onPress={handleRegister}
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
            Register
          </Text>
        </TouchableOpacity>

        {/* ✅ Login link */}
        <Link
          href="/login"
          style={{
            marginTop: 24,
            textAlign: "center",
            color: "#166534",
            fontWeight: "500",
          }}
        >
          Already have an account? Login
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}

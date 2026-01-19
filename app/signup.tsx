import { Link } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F0FDF4",
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
        }}
      >
        Create Account
      </Text>

      <Text style={{ color: "#166534", marginBottom: 32 }}>
        Signup to get started
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#4D7C0F"
        value={email}
        onChangeText={setEmail}
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
        onChangeText={setPassword}
        secureTextEntry
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
        placeholder="Confirm Password"
        placeholderTextColor="#4D7C0F"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
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
        style={{
          backgroundColor: "#16A34A",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 16 }}>
          Create Account
        </Text>
      </TouchableOpacity>

      <Link
        href="/"
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
  );
}
import { useState } from "react";
import { Alert, Button, View } from "react-native";
import CustomInput from "../components/CustomInput";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validate = () => {
    let valid = true;

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!email.includes("@")) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleLogin = () => {
    if (validate()) {
      Alert.alert("Success", "Login Successful ✅");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <CustomInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        error={emailError}
      />

      <CustomInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
        error={passwordError}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen
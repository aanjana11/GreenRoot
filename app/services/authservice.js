import axios from 'axios';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      // API call
      const response = await axios.post('http://192.168.1.79:8000/api/auth/signup', {
        username: username,
        password: password
      });
      // Success message
      setMessage(response.data.success);
    } catch (error) {
      // Error message
      setMessage(error.response.data.error || 'Something went wrong');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Register" onPress={handleRegister} />
      {message ? <Text style={{ marginTop: 10 }}>{message}</Text> : null}
    </View>
  );
}
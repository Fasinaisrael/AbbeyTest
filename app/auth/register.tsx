// RegisterScreen.tsx
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { registerUser } from "@/utils/mock";
import AuthScreen from "@/components/AuthScreen";

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    try {
      const success = await registerUser(username, password);
      if (success) {
        Alert.alert("Success", "Registration successful! Please login.");
        router.replace("/auth/login");
      } else {
        Alert.alert("Error", "User already exists");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during registration");
      console.error("Registration error:", error);
    }
  };

  return (
    <AuthScreen
      title="Register"
      onSubmit={handleRegister}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      submitLabel="Register"
    />
  );
}

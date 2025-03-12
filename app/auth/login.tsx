// LoginScreen.tsx
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { loginUser } from "@/utils/mock";
import AuthScreen from "@/components/AuthScreen";

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    try {
      const user = await loginUser(username, password);
      if (user) {
        Alert.alert("Success", "Login successful!");
        router.replace("/(tabs)/dashboard");
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during login");
      console.error("Login error:", error);
    }
  };

  return (
    <AuthScreen
      title="Login"
      onSubmit={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      submitLabel="Login"
    />
  );
}

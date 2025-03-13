import { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, registerUser } from "@/utils/mock";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function EntryScreen() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const isFirstLaunch = await AsyncStorage.getItem("hasLaunched");
        const currentUser = await AsyncStorage.getItem("mock_session");

        if (!isFirstLaunch) {
          await AsyncStorage.setItem("hasLaunched", "true");
          router.replace("/auth/register"); // First launch: go to register
        } else if (currentUser) {
          router.replace("/(tabs)/dashboard"); // User already logged in
        } else {
          router.replace("/auth/register"); // Default to login
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };

    checkAuthStatus();
  }, [router]);

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    try {
      const success = await registerUser(username, password);
      if (success) {
        Alert.alert("Success", "Registration successful! Please login.");
        router.replace("/");
      } else {
        Alert.alert("Error", "User already exists");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during registration");
      console.error("Registration error:", error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Register</ThemedText>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <ThemedView style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            style={styles.inputFlex}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <ThemedText>
              {isPasswordVisible ? "Hide" : "Show"}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <Button title="Register" onPress={handleRegister} color="#4CAF50" />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "white",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  inputFlex: {
    flex: 1,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "white",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

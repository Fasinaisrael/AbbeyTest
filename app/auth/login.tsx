import { useState } from "react";
import {
  Alert,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { loginUser } from "@/utils/mock";
import AuthScreen from "@/components/AuthScreen";
import * as LocalAuthentication from "expo-local-authentication";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [biometricAvailable, setBiometricAvailable] = useState<boolean>(false);

  // Simulate login process with 2-second loading
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter both username and password");
      return;
    }

    setLoading(true); // Start loader
    setTimeout(async () => {
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
      } finally {
        setLoading(false); // Stop loader
      }
    }, 2000);
  };

  // Simulate biometric login with 2-second loading
  const handleBiometricLogin = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Face ID or Fingerprint",
        fallbackLabel: "Use Passcode",
      });

      if (result.success) {
        setLoading(true); // Start loader
        setTimeout(() => {
          Alert.alert("Success", "Biometric authentication successful!");
          router.replace("/(tabs)/dashboard");
          setLoading(false); // Stop loader
        }, 2000);
      } else {
        Alert.alert("Error", "Biometric authentication failed");
      }
    } catch (error) {
      console.error("Biometric error:", error);
      Alert.alert("Error", "Biometric authentication error");
    }
  };

  return (
    <View style={styles.container}>
      <AuthScreen
        title="Login"
        onSubmit={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        submitLabel="Login"
        showRegister
      />
      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => router.replace("/auth/forgotPassword")}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Blurry Full-Screen Loader */}
      <Modal transparent={true} animationType="fade" visible={loading}>
        <View style={styles.loaderOverlay}>
          <View style={styles.loaderContent}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loadingText}>Signinig In...</Text>
          </View>
        </View>
      </Modal>

      {/* Biometric Login */}
      {biometricAvailable && !loading && (
        <TouchableOpacity
          style={styles.biometricButton}
          onPress={handleBiometricLogin}
        >
          <Ionicons name="finger-print" size={32} color="#002668" />
          <Text style={styles.biometricText}>Login with Biometrics</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Blurry background
  },
  loaderContent: {
    padding: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#fff",
  },
  biometricButton: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  biometricText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#002668",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginRight: 30,
    marginTop: 10,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#000",
    textDecorationLine: "underline",
  },
});

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
import { registerUser } from "@/utils/mock";
import AuthScreen from "@/components/AuthScreen";

export default function RegisterScreen() {
  const router = useRouter();

  // State for all input fields
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Handle registration
  const handleRegister = async () => {
    if (!firstName || !lastName || !username || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    setLoading(true); // Start loader
    setTimeout(async () => {
      try {
        // Pass all four arguments to registerUser
        const success = await registerUser(
          firstName,
          lastName,
          username,
          password
        );
        if (success) {
          Alert.alert("Success", "Registration successful! Verify OTP.");
          router.replace("/auth/otpScreen");
        } else {
          Alert.alert("Error", "User already exists");
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred during registration");
        console.error("Registration error:", error);
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <AuthScreen
        title="Register"
        onSubmit={handleRegister}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        submitLabel="Register"
        showLogin
        showSocialButtons
      />
      <Modal transparent={true} animationType="fade" visible={loading}>
        <View style={styles.loaderOverlay}>
          <View style={styles.loaderContent}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loadingText}>Signing up...</Text>
          </View>
        </View>
      </Modal>
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
});

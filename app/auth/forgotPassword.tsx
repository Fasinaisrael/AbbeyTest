import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { resetPassword } from "@/utils/mock";
import AuthScreen from "@/components/AuthScreen";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleResetPassword = async () => {
    if (!newPassword) {
      Alert.alert("Error", "Please enter a new password");
      return;
    }

    try {
      setLoading(true);
      const success = await resetPassword(newPassword);

      if (success) {
        Alert.alert("Success", "Password reset successful! Please log in.");
        router.replace("/auth/login");
      } else {
        Alert.alert("Error", "Failed to reset password. Try again.");
      }
    } catch (error) {
      console.error("Reset error:", error);
      Alert.alert("Error", "An error occurred during password reset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AuthScreen
        title="Reset Password"
        onSubmit={handleResetPassword}
        password={newPassword}
        setPassword={setNewPassword}
        submitLabel="Reset"
      />

      {/* Back to Login Link */}
      <TouchableOpacity
        style={styles.backToLogin}
        onPress={() => router.push("/auth/login")}
      >
        <Text style={styles.backToLoginText}>Back to Login</Text>
      </TouchableOpacity>

      {/* Loading Overlay */}
      {loading && (
        <Modal transparent={true} animationType="fade" visible={loading}>
          <View style={styles.loaderOverlay}>
            <View style={styles.loaderContent}>
              <ActivityIndicator size="large" color="#ffffff" />
              <Text style={styles.loadingText}>Resetting Password...</Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backToLogin: {
    marginTop: 20,
    alignSelf: "center",
  },
  backToLoginText: {
    fontSize: 14,
    color: "#002668",
    textDecorationLine: "underline",
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
});

// ResetPasswordScreen.tsx
import { useState } from "react";
import { Alert, Button, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { resetPassword } from "@/utils/mock";
import AuthScreen from "@/components/AuthScreen";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState<string>("");

  const handleResetPassword = async () => {
    if (!newPassword) {
      Alert.alert("Error", "Please enter a new password");
      return;
    }

    try {
      const success = await resetPassword(newPassword);
      if (success) {
        Alert.alert("Success", "Password reset successful! Please login.");
        router.replace("/auth/login");
      } else {
        Alert.alert("Error", "Failed to reset password");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during password reset");
      console.error("Reset error:", error);
    }
  };

  return (
    <AuthScreen
      title="Reset Password"
      onSubmit={handleResetPassword}
      password={newPassword}
      setPassword={setNewPassword}
      submitLabel="Reset"
    />
  );
}

import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

const BiometricAuth = () => {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  // Check if Biometric Authentication is Available
  useEffect(() => {
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

      console.log("Supported Types: ", supportedTypes); // Debug

      setIsBiometricAvailable(compatible && supportedTypes.length > 0);
    };
    checkBiometricSupport();
  }, []);

  // Authenticate User
  const handleBiometricAuth = async () => {
    try {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Biometrics",
        fallbackLabel: "Enter Password",
      });

      if (biometricAuth.success) {
        Alert.alert("Success", "Authenticated successfully!");
      } else {
        Alert.alert("Failed", "Biometric Authentication Failed");
      }
    } catch (error) {
      console.error("Biometric Error:", error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Biometric Authentication</Text>
      {isBiometricAvailable ? (
        <Button title="Login with Face ID / Fingerprint" onPress={handleBiometricAuth} />
      ) : (
        <Text style={styles.warningText}>Biometrics not available on this device</Text>
      )}
    </View>
  );
};

export default BiometricAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  warningText: {
    color: "red",
    marginTop: 10,
  },
});

import {
  Image,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from "react-native";
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

interface AuthScreenProps {
  title: string;
  onSubmit: () => void;
  firstName?: string;
  setFirstName?: (text: string) => void;
  lastName?: string;
  setLastName?: (text: string) => void;
  username?: string;
  setUsername?: (text: string) => void;
  password?: string;
  setPassword?: (text: string) => void;
  confirmPassword?: string;
  setConfirmPassword?: (text: string) => void;
  submitLabel: string;
  showLogin?: boolean;
  showRegister?: boolean;
  showForgotPassword?: boolean;
}



export default function AuthScreen({
  title,
  onSubmit,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  submitLabel,
  showLogin = false,
  showRegister = false,
  showForgotPassword = false,
}: AuthScreenProps) {


  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmShowPassword, setConfirmShowPassword] =
    useState<boolean>(false);

  const router = useRouter();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.innerContainer}>
          <Image
            source={require("@/assets/images/AbbeyMortgageLogo.png")}
            style={styles.reactLogo}
          />
          <ThemedText type="title" style={styles.title}>
            {title}
          </ThemedText>

          {/* First Name */}
          {firstName !== undefined && setFirstName && (
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
              placeholderTextColor="#ccc"
            />
          )}

          {/* Last Name */}
          {lastName !== undefined && setLastName && (
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
              placeholderTextColor="#ccc"
            />
          )}

          {/* Username */}
          {username !== undefined && setUsername && (
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              placeholderTextColor="#ccc"
            />
          )}

          {/* Password */}
          {password !== undefined && setPassword && (
            <ThemedView style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
                placeholderTextColor="#ccc"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.showButton}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#002668"
                />
              </TouchableOpacity>
            </ThemedView>
          )}

          {/* Confirm Password */}
          {confirmPassword !== undefined && setConfirmPassword && (
            <ThemedView style={styles.passwordContainer}>
              <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!confirmShowPassword}
                style={styles.input}
                placeholderTextColor="#ccc"
              />
              <TouchableOpacity
                onPress={() => setConfirmShowPassword(!confirmShowPassword)}
                style={styles.showButton}
              >
                <Ionicons
                  name={confirmShowPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#002668"
                />
              </TouchableOpacity>
            </ThemedView>
          )}
          {showForgotPassword && (
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => router.replace("/auth/forgotPassword")}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}

          <Button title={submitLabel} onPress={onSubmit} color="#002668" />

          {showLogin && (
            <ThemedView style={styles.loginContainer}>
              <ThemedText style={styles.loginText}>
                Already have an account?
              </ThemedText>
              <Button
                title="Login"
                onPress={() => router.replace("/auth/login")}
                color="#002668"
              />
            </ThemedView>
          )}

          {showRegister && (
            <ThemedView style={styles.loginContainer}>
              <ThemedText style={styles.loginText}>
                Dont have an account?
              </ThemedText>
              <Button
                title="Sign Up"
                onPress={() => router.replace("/auth/register")}
                color="#002668"
              />
            </ThemedView>
          )}
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  innerContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    width: 250,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#002668",
    borderRadius: 8,
    paddingRight: 50,
    color: "#002668",
    fontSize: 15,
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
    backgroundColor: "#fff",
  },
  showButton: {
    position: "absolute",
    right: 10,
    top: "30%",
  },
  title: {
    color: "#002668",
  },
  reactLogo: {
    height: 178,
    width: 290,
    marginBottom: 20,
  },
  loginContainer: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
  },
  loginText: {
    marginBottom: 0,
    color: "red",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginRight: 30,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
    backgroundColor: "none",
  },
  forgotPasswordText: {
    fontSize: 16,
    color: "#000",
    textDecorationLine: "underline",
  },
});

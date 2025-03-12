// AuthScreen.tsx
import {
  Image,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface AuthScreenProps {
  title: string;
  onSubmit: () => void;
  username?: string;
  setUsername?: (text: string) => void;
  password?: string;
  setPassword?: (text: string) => void;
  submitLabel: string;
}

export default function AuthScreen({
  title,
  onSubmit,
  username,
  setUsername,
  password,
  setPassword,
  submitLabel,
}: AuthScreenProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.innerContainer}>
          <Image
            source={require("@/assets/images/partial-react-logo.png")}
            style={styles.reactLogo}
          />
          <ThemedText type="title">{title}</ThemedText>

          {username !== undefined && setUsername && (
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
          )}

          {password !== undefined && setPassword && (
            <ThemedView style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.showButton}
              >
                <ThemedText>{showPassword ? "Hide" : "Show"}</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}

          <Button title={submitLabel} onPress={onSubmit} color="#4CAF50" />
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  innerContainer: {
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingRight: 50,
    color: "white",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  showButton: {
    position: "absolute",
    right: 10,
    top: "30%",
  },
  reactLogo: {
    height: 178,
    width: 290,
    marginBottom: 20,
  },
});

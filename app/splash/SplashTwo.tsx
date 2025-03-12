import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SplashTwo() {
  const router = useRouter();

  const goToSplashThree = () => {
    router.push("/splash/SplashThree");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Splash Screen 2</Text>
      <Text style={styles.description}>
        Continue to explore more features of the app!
      </Text>
      <Button title="Next" onPress={goToSplashThree} color="#1E90FF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    color: "#666",
  },
});

import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

export default function SplashOne() {
  const router = useRouter();

  const goToSplashTwo = () => {
    router.push("/splash/SplashThree");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          // source={require('@/assets/images/splash1.png')} // Ensure image exists
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Splash Screen Two</Text>
        <Text style={styles.description}>
          Discover amazing features and enjoy a seamless experience with our
          app.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Previous"
          onPress={() => router.push("/splash/SplashOne")}
          color="#FF6347"
        />
        <Button title="Next" onPress={goToSplashTwo} color="#4CAF50" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: "80%",
    height: 300,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonContainer: {
    width: "80%",
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

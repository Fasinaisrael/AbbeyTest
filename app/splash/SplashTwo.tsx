import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import * as Animatable from "react-native-animatable";

export default function SplashOne() {
  const router = useRouter();

  const goToSplashTwo = () => {
    router.push("/splash/SplashThree");
  };

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="bounceIn"
        duration={1500}
        source={require("@/assets/images/AbbeyMortgageLogo.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Animatable.Text
        animation="slideInLeft"
        duration={1000}
        style={styles.title}
      >
        Splash Screen Two
      </Animatable.Text>
      <Animatable.Text
        animation="slideInLeft"
        duration={1000}
        style={styles.description}
      >
        Discover amazing features and enjoy a seamless experience with our app.
      </Animatable.Text>

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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 0,
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

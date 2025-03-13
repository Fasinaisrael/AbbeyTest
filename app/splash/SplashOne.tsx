import { View, Text, Button, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import * as Animatable from "react-native-animatable";

export default function SplashOne() {
  const router = useRouter();

  const goToSplashTwo = () => {
    router.push("/splash/SplashTwo");
  };

  return (
    <View style={styles.container}>
      {/* Fade-in and bounce the logo */}
      <Animatable.Image
        animation="bounceIn"
        duration={1500}
        source={require("@/assets/images/AbbeyMortgageLogo.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Slide-in Title */}
      <Animatable.Text
        animation="slideInDown"
        duration={1000}
        style={styles.title}
      >
        Welcome to ABBEY BANKING!
      </Animatable.Text>

      {/* Fade-in description */}
      <Animatable.Text animation="fadeIn" delay={800} style={styles.description}>
        Discover amazing features and enjoy a seamless experience with our app.
      </Animatable.Text>

      <View style={styles.buttonContainer}>
        {/* Button with pulse effect */}
        <Animatable.View animation="pulse" iterationCount="infinite">
          <Button title="Next" onPress={goToSplashTwo} color="#4CAF50" />
        </Animatable.View>
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
  },
});

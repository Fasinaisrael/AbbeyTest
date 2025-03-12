import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashOne() {
  const router = useRouter();

  const goToSplashTwo = () => {
    router.push('/splash/SplashTwo');
  };

  return (
    <View style={styles.container}>
      <Image
        // source={require('@/assets/images/splash1.png')} // Ensure image exists
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to ABBEY BANKING!</Text>
      <Text style={styles.description}>
        Discover amazing features and enjoy a seamless experience with our app.
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Next" onPress={goToSplashTwo} color="#4CAF50" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 0,
  },
  image: {
    width: '80%',
    height: 300,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '80%',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

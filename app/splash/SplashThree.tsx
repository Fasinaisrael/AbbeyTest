import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashThree() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          // source={require('@/assets/images/splash3.png')} // Ensure image exists
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Splash Screen 3</Text>
        <Text style={styles.description}>
          You're almost there! Let's get started.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Previous" onPress={() => router.push('/splash/SplashTwo')} color="#FF6347" />
        <Button title="Finish" onPress={() => router.replace('/')} color="#4CAF50" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '80%',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

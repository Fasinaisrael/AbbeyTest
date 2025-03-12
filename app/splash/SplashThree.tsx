import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashThree() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Splash Screen 3</Text>
      <Text style={styles.description}>You're almost there! Let's get started.</Text>
      <Button title="Finish" onPress={() => router.replace('/')} color="#4CAF50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: '#555',
  },
});


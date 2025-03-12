// app/_layout.js
import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { useNavigation } from 'expo-router';

export default function RootLayout() {
  const navigation = useNavigation();

  useEffect(() => {
    console.log('RootLayout mounted');
  }, []);

  return <Slot />;
}

// OTPScreen.tsx
import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { requestOTP } from '@/utils/mock';
import AuthScreen from '@/components/AuthScreen';

export default function OTPScreen() {
  const router = useRouter();
  const [otp, setOTP] = useState<string>('');

  const handleVerifyOTP = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }

    try {
      const isValid = await requestOTP(otp);
      if (isValid) {
        Alert.alert('Success', 'OTP verified!');
        router.replace('/auth/login');
      } else {
        Alert.alert('Error', 'Invalid OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during OTP verification');
      console.error('OTP error:', error);
    }
  };

  return (
    <AuthScreen
      title="Verify OTP"
      onSubmit={handleVerifyOTP}
      username={otp}
      setUsername={setOTP}
      submitLabel="Verify"
    />
  );
}

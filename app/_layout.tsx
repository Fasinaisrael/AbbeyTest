import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashOne from "./splash/SplashOne";

export default function RootLayout() {
  const [hasSeenSplash, setHasSeenSplash] = useState<boolean | null>(null);
  const router = useRouter();

  // ✅ Utility function to clear the splash flag
  const clearSplashFlag = async () => {
    try {
      await AsyncStorage.removeItem("hasSeenSplash");
      console.log("Splash flag removed successfully");
    } catch (error) {
      console.error("Error clearing splash flag:", error);
    }
  };

  useEffect(() => {
    const checkSplashStatus = async () => {
      try {
        const seenSplash = await AsyncStorage.getItem("hasSeenSplash");
        setHasSeenSplash(seenSplash ? true : false);
      } catch (error) {
        console.error("Error checking splash screen status:", error);
      }
    };

    checkSplashStatus();
  }, []);

  useEffect(() => {
    // Navigate to Splash screen if the user hasn't seen it
    if (hasSeenSplash === false) {
      router.replace("/splash/SplashOne");
    }
  }, [hasSeenSplash]);

  // ✅ Trigger clearSplashFlag if needed (Call this manually when required)
  useEffect(() => {
    clearSplashFlag(); // This will clear the storage every time the app starts
  }, []);

  // Ensure no premature navigation
  if (hasSeenSplash === null) return null;

  return <Slot />;
}

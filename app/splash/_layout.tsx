import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashLayout() {
  const router = useRouter();
  const [hasLaunched, setHasLaunched] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLaunchStatus = async () => {
      try {
        const launched = await AsyncStorage.getItem("hasLaunched");
        if (!launched) {
          // First launch: Set flag and navigate to SplashOne
          await AsyncStorage.setItem("hasLaunched", "true");
          router.replace("/splash/SplashOne");
        } else {
          // Already launched: Proceed to the main app
          router.replace("/auth/login");
        }
      } catch (error) {
        console.error("Error checking launch status:", error);
      }
    };

    checkLaunchStatus();
  }, []);

  if (hasLaunched === null) return null; // Avoid rendering prematurely

  return <Slot />;
}


import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        console.log("🚀 Initializing the app...");

        // Reset launch flag for testing (remove this later if needed)
        await AsyncStorage.setItem("hasLaunched", "false");

        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        console.log("🔍 Retrieved hasLaunched value:", hasLaunched);

        if (hasLaunched !== "true") {
          console.log("✅ Navigating to SplashOne...");
          // Delay navigation until Slot is mounted
          setTimeout(() => router.replace("/splash/SplashOne"), 0);
        } else {
          console.log("🔑 Navigating to Login...");
          setTimeout(() => router.replace("/auth/login"), 0);
        }
      } catch (error) {
        console.error("❌ Error during initialization:", error);
      } finally {
        setIsReady(true); // Ensure Slot is rendered
      }
    };

    init();
  }, []);

  // Ensure nothing renders until navigation is ready
  if (!isReady) return null;

  return <Slot />;
}

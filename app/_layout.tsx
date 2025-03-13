// app/_layout.tsx
import { Slot, useRouter, useRootNavigationState } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { account } from "@/utils/appwrite";

export default function RootLayout() {
  const router = useRouter();
  const navigationState = useRootNavigationState(); // Ensures navigation tree is ready
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        // Clear session and reset splash flag
        // await account.deleteSession("current");
        await AsyncStorage.setItem("hasLaunched", "false");

        // Check splash status after clearing session
        const hasLaunched = await AsyncStorage.getItem("hasLaunched");
        console.log("hasLaunched value:", hasLaunched);

        // Navigate to splash screen if needed
        if (hasLaunched !== "true") {
          console.log("object")
          router.replace("/splash/SplashOne");
        }
      } catch (error) {
        console.error("Error during initialization:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (navigationState?.key) {
      init();
    }
  }, [navigationState?.key]); // Wait until navigation tree is ready

  if (isLoading) return null; // Avoid rendering during initialization

  return <Slot />;
}

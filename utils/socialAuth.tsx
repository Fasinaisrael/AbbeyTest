import { useState, useEffect } from "react";
import { Alert, Button, Platform, View } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function googleSignIn() {
  const [userInfo, setUserInfo] = useState<any>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Platform.select({
      ios: "YOUR_IOS_CLIENT_ID",
      android: "YOUR_ANDROID_CLIENT_ID",
      web: "YOUR_WEB_CLIENT_ID",
    }),
  });

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      fetchUserInfo(response.authentication.accessToken);
    }
  }, [response]);

  const fetchUserInfo = async (token: string) => {
    try {
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const userData = await userInfoResponse.json();
      setUserInfo(userData);
      Alert.alert("Google Sign-In", `Welcome, ${userData.name}!`);
      console.log("User Info:", userData);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      Alert.alert("Error", "Failed to fetch Google user data.");
    }
  };

  return (
    <View>
      <Button
        title="Sign in with Google"
        onPress={() => promptAsync()}
        disabled={!request}
      />
    </View>
  );
}

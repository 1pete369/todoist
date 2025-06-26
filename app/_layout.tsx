// app/_layout.tsx
import { UserProvider, useUserContext } from "@/context/useAuthContext";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";

// Keep the splash screen visible until we explicitly hide it
SplashScreen.preventAutoHideAsync();

function Gate() {
  const { user, isCheckingAuth } = useUserContext();
  const router = useRouter();
  const segments = useSegments();
  const [ready, setReady] = useState(false);
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (isCheckingAuth) return;

    // Decide destination only once
    if (!hasNavigated.current) {
      console.log("Segments",segments)
      const inAuthGroup = segments[0] === "(authenticated)";

      if (user && !inAuthGroup) {
        router.replace("/(authenticated)/(tabs)/today");
      } else if (!user && inAuthGroup) {
        router.replace("/");
      }

      hasNavigated.current = true;
    }

    // Now we’re done deciding — hide the splash screen and render the app
    SplashScreen.hideAsync();
    setReady(true);
  }, [isCheckingAuth, user, segments]);

  // While checking or before hideAsync, render nothing (native splash still showing)
  if (!ready) {
    return null;
  }

  // When ready, mount the Expo Router slot
  return <Slot />;
}

export default function RootLayout() {
  return (
    <UserProvider>
      <Gate />
      <Toast />
    </UserProvider>
  );
}

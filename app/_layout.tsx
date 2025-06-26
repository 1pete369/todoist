// app/_layout.tsx
import { UserProvider, useUserContext } from "@/context/useAuthContext"
import { Slot, useRouter, useSegments } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect, useRef, useState } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Toaster } from "sonner-native"
import "../global.css"

// Keep the splash screen visible until we explicitly hide it
SplashScreen.preventAutoHideAsync()

function Gate() {
  const { user, isCheckingAuth } = useUserContext()
  const router = useRouter()
  const segments = useSegments()
  const [ready, setReady] = useState(false)
  const hasNavigated = useRef(false)

  useEffect(() => {
    if (isCheckingAuth) return

    const inAuthGroup = segments[0] === "(authenticated)"

    if (user && !inAuthGroup) {
      router.replace("/(authenticated)/(tabs)/today")
    } else if (!user && inAuthGroup) {
      router.replace("/")
    }

    SplashScreen.hideAsync()
    setReady(true)
  }, [isCheckingAuth, user, segments])

  // While checking or before hideAsync, render nothing (native splash still showing)
  if (!ready) {
    return null
  }

  // When ready, mount the Expo Router slot
  return <Slot />
}

export default function RootLayout() {
  return (
    <UserProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Gate />
        <Toaster />
      </GestureHandlerRootView>
    </UserProvider>
  )
}

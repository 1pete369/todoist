import { Colors } from "@/constants/Colors"
import { useUserContext } from "@/context/useAuthContext"
import { Ionicons } from "@expo/vector-icons"
import { Link, Stack } from "expo-router"
import React from "react"
import { Image } from "react-native"

export default function TodayLayout() {
  return (
    <Stack
      screenOptions={{
        // headerShown: false,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: Colors.backgroundAlt },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Browse",
          headerLargeTitle: true,
          headerTitleAlign: "center",
          headerLeft: () => <HeaderLeft />,

          headerRight: () => <HeaderRight />,
        }}
      />
    </Stack>
  )
}

const HeaderLeft = () => {
  const { user } = useUserContext()
  return user?.profilePic ?
      <Image source={{ uri: user?.profilePic }} />
    : <Ionicons name="person-circle-outline" size={28} />
}

const HeaderRight = () => {
  const { user } = useUserContext()
  return (
    // <Link href={"/browse/settings"}>
      <Ionicons name="settings-outline" size={28} color={Colors.primary} />
    // </Link>
  )
}

import { Colors } from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import { useRouter } from "expo-router"
import React from "react"
import { Text, TouchableOpacity } from "react-native"

export default function Fab() {
  const router = useRouter()

  const fabPressed = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    router.push("/task/new")
  }

  return (
    <TouchableOpacity
      onPress={fabPressed}
      className="absolute bottom-20 right-10 p-5 rounded-full"
      style={{ backgroundColor: Colors.primary }}
    >
      <Text className="text-lg text-white">
        <Ionicons name="add" size={28} />
      </Text>
    </TouchableOpacity>
  )
}

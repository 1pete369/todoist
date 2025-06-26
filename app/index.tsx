import { Colors } from "@/constants/Colors"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useRouter } from "expo-router"
import * as WebBrowser from "expo-web-browser"
import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function Index({ navigation }: any) {
  const { top } = useSafeAreaInsets()
  const router = useRouter()

  const openLink = async () => {
    WebBrowser.openBrowserAsync("https://galaxies.dev")
  }

  return (
    <View style={{ paddingTop: top }} className="flex-1 items-center px-10">
      <Image
        source={require("@/assets/images/todoist-logo.png")}
        resizeMode="contain"
        className="w-48 h-20 "
      />
      <Image source={require("@/assets/images/login.png")} className="" />
      <View className="flex gap-4 w-full mt-20">
        <TouchableOpacity className="flex flex-row gap-3 items-center justify-center rounded py-2 px-4 border border-gray-500 ">
          <Ionicons name="mail" size={24} />
          <Text
            className="text-lg"
            onPress={() => router.push("/SignupScreen")}
          >
            Continue with Email
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex mt-8">
        <Text
          className="text-center break-keep"
          style={{ color: Colors.lightText }}
        >
          By continuing you agree to Todoist&apos;s{" "}
          <Text className=" underline" onPress={openLink}>
            Terms of service
          </Text>{" "}
          and{" "}
          <Text className=" underline" onPress={openLink}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    </View>
  )
}

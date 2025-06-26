import Fab from "@/components/Fab"
import { useUserContext } from "@/context/useAuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { jwtDecode } from "jwt-decode"
import React, { useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

export default function Browse() {
  const { user, logout } = useUserContext()
  const [timeElapsed, setTimeElapsed] = useState<number>(0) // seconds since login
  const [timeLeft, setTimeLeft] = useState<number>(0) // seconds until expiry

  useEffect(() => {
    let interval: any
    const init = async () => {
      const token = await AsyncStorage.getItem("token")
      if (!token) return

      interface DecodedToken {
        iat: number
        exp: number
      }

      const decoded = jwtDecode<DecodedToken>(token)
      const loginTime = decoded.iat
      const expireTime = decoded.exp

      interval = setInterval(() => {
        const now = Math.floor(Date.now() / 1000)
        setTimeElapsed(now - loginTime)
        setTimeLeft(expireTime - now)
      }, 1000)
    }

    init()

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number): string => {
    const days = Math.floor(seconds / (24 * 60 * 60))
    const hours = Math.floor((seconds % (24 * 60 * 60)) / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${days}d ${hours}h ${mins}m ${secs}s`
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <>
      <View className="flex-1 bg-slate-100 justify-center items-center px-4">
        <View className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
          <Text className="text-center text-3xl font-bold text-slate-900 mb-2">
            {user?.fullName}
          </Text>
          <Text className="text-center text-base text-slate-500 mb-1">
            {user?.email}
          </Text>
          <Text className="text-center text-base text-slate-500 mb-6">
            {user?.username}
          </Text>

          {/* Time Info */}
          <View className="bg-slate-50 p-4 rounded-xl mb-4 border border-slate-200">
            <Text className="text-center text-lg font-medium text-slate-800">
              Logged in for:
            </Text>
            <Text className="text-center text-xl font-bold text-green-600">
              {formatTime(timeElapsed)}
            </Text>
          </View>

          <View className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <Text className="text-center text-lg font-medium text-slate-800">
              Time left:
            </Text>
            <Text className="text-center text-xl font-bold text-red-600">
              {formatTime(timeLeft)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 p-3 rounded-xl"
          >
            <Text className="text-center text-white font-bold text-lg">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Fab />
    </>
  )
}

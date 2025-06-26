import React, { createContext, useContext, useEffect, useState } from "react"
import { axiosInstance } from "../lib/axiosInstance"
import Toast from "react-native-toast-message"
import AsyncStorage from "@react-native-async-storage/async-storage"

type User = {
  _id: string
  fullName: string
  username: string
  email: string
  profilePic?: string
}

type UserContextType = {
  user: User | null
  isCheckingAuth: boolean
  isSigningUp: boolean
  isLoggingIn: boolean
  isUpdatingProfile: boolean
  setIsUpdatingProfile: React.Dispatch<React.SetStateAction<boolean>>
  signup: (data: {
    fullName: string
    username: string
    email: string
    password: string
  }) => Promise<boolean> // ✅ changed from Promise<void>
  login: (data: { email: string; password: string }) => Promise<boolean> // ✅ changed from Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  updateProfile: (data: { media: string }) => Promise<void>
}

const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)

  const checkAuth = async () => {
    setIsCheckingAuth(true)
    const token = await AsyncStorage.getItem("token")
    console.log("Token inside interceptor:", token)

    try {
      const res = await axiosInstance.get("/auth/check")
      console.log("Data", res.data)
      setUser(res.data)
    } catch (error: any) {
      console.log("Auth Check Failed:", error.message)
      setUser(null)
    } finally {
      setIsCheckingAuth(false)
    }
  }

  const signup = async (data: {
    fullName: string
    username: string
    email: string
    password: string
  }): Promise<boolean> => {
    setIsSigningUp(true)
    try {
      console.log("came to signup")
      const res = await axiosInstance.post("/auth/signup", data)
      console.log("res.data",res.data)
      setUser(res.data)
      await AsyncStorage.setItem("token", res.data.token)
      Toast.show({ type: "success", text1: "Signup successful!" })
      await AsyncStorage.setItem("onBoardingDone", "true")
      return true
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Signup failed",
      })
      return false
    } finally {
      setIsSigningUp(false)
    }
  }

  const login = async (data: {
    email: string
    password: string
  }): Promise<boolean> => {
    setIsLoggingIn(true)
    try {
      const res = await axiosInstance.post("/auth/login", data)
      setUser(res.data)
      await AsyncStorage.setItem("token", res.data.token)
      Toast.show({ type: "success", text1: "Logged in successfully!" })
      await AsyncStorage.setItem("onBoardingDone", "true")
      return true
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Login failed",
      })
      return false
    } finally {
      setIsLoggingIn(false)
    }
  }

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout")
      await AsyncStorage.removeItem("token")
      await AsyncStorage.removeItem("onBoardingDone")
      setUser(null)
      Toast.show({ type: "success", text1: "Logged out!" })
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Logout failed",
      })
    }
  }

  const updateProfile = async (data: { media: string }) => {
    setIsUpdatingProfile(true)
    try {
      const res = await axiosInstance.put("/auth/update-profile", data)
      setUser(res.data)
      Toast.show({ type: "success", text1: "Profile updated!" })
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Profile update failed",
      })
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        isCheckingAuth,
        isSigningUp,
        isLoggingIn,
        isUpdatingProfile,
        setIsUpdatingProfile,
        signup,
        login,
        logout,
        checkAuth,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)

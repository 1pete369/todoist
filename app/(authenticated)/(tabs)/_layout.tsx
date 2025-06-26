import { Colors } from "@/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import React from "react"

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.dark,
      }}
    >
      <Tabs.Screen
        name="today"
        options={{
          title: "Today",
          tabBarIcon: ({ color, size, focused }) =>
            focused ?
              <Ionicons name="calendar-clear" size={size} color={color} />
            : <Ionicons
                name="calendar-clear-outline"
                size={size}
                color={color}
              />,
        }}
      />
      <Tabs.Screen
        name="upcoming"
        options={{
          title: "Upcoming",
          tabBarIcon: ({ color, size, focused }) =>
            focused ?
              <Ionicons name="calendar" size={size} color={color} />
            : <Ionicons name="calendar-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size, focused }) =>
            focused ?
              <Ionicons name="search" size={size} color={color} />
            : <Ionicons name="search-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: "Browse",
          tabBarIcon: ({ color, size, focused }) =>
            focused ?
              <Ionicons name="document" size={size} color={color} />
            : <Ionicons name="document-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}

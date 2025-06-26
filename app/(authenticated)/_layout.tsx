// app/(authenticated)/_layout.tsx
import { Stack } from "expo-router"

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="task/new" options={{presentation : "modal"}} />
    </Stack>
  )
}

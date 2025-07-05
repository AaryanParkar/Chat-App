import { Stack } from "expo-router";
import { UserProvider } from "../context/UserContext";
export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="rooms" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
}

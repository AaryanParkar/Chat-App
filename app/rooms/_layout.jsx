// app/rooms/_layout.tsx
import { Stack } from "expo-router";

export default function RoomsLayout() {
  return (
    <Stack>
      <Stack.Screen
        // folders wrapped in () are hidden
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="[roomId]" options={{ title: "Chat Room" }} />
    </Stack>
  );
}
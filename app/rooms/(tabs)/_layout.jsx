import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === "index" ? "chatbubbles" : "person";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "#888",
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: Platform.OS === "ios" ? 0 : 4,
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          paddingTop: 6,
          borderTopWidth: 1,
          borderTopColor: "#eee",
          height: 60,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#f9f9f9",
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
          elevation: 0,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "600",
          color: "#333",
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Rooms",
          tabBarLabel: "Rooms",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
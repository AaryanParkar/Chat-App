import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  //   TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { auth } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.replace("/rooms");
      })
      .catch((error) => {
        Alert.alert("Login Error", error.message);
      });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: 16,
    },
    inputContainer: {
      width: "100%",
      marginBottom: 24,
    },
    maintitle: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#007bff",
      textAlign: "center",
    },
    title: {
      fontSize: 22,
      fontWeight: "600",
      color: "#222",
      textAlign: "center",
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      color: "#666",
      textAlign: "center",
      marginBottom: 24,
    },
    input: {
      width: 380,
      height: 48,
      borderWidth: 1,
      borderColor: "#ccc",
      color: "#ddd",
      borderRadius: 20,
      paddingHorizontal: 12,
      marginBottom: 12,
      fontSize: 16,
    },
    button: {
      backgroundColor: "#007bff",
      paddingVertical: 12,
      paddingHorizontal: 122,
      borderRadius: 15,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inputContainer}>
        <Text style={styles.maintitle}>My Chat App</Text>
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Login to continue chatting</Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 40,
            alignSelf: "center",
          }}
        >
          Login
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/register")}>
        <Text
          style={{
            color: "#007bff",
            fontSize: 16,
            textAlign: "center",
            marginTop: 16,
          }}
        >
          Don't have an account? Register
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

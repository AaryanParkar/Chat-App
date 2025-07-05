import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { auth } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.replace("/rooms");
      })
      .catch((error) => {
        Alert.alert("Registration Error", error.message);
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
  });
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inputContainer}>
        <Text style={styles.maintitle}>My Chat App</Text>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Create a new account</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 5,
            marginBottom: 16,
          }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 5,
            marginBottom: 16,
          }}
        />
        <Pressable
          onPress={handleRegister}
          style={{
            backgroundColor: "#007bff",
            padding: 15,
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Register
          </Text>
        </Pressable>
              <Pressable onPress={() => router.push("/login")}>
        <Text
          style={{
            color: "#007bff",
            fontSize: 16,
            textAlign: "center",
            marginTop: 16,
          }}
        >
        Already have an account? login
        </Text>
      </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

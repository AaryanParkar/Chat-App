import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Pressable,
  } from "react-native";
  import { signOut } from "firebase/auth";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { auth } from "../../../firebase";
  import { router } from "expo-router";
  import { useContext, useState } from "react";
  import { UserContext } from "../../../context/UserContext";
  import { Ionicons } from "@expo/vector-icons";
 
  export default function Profile() {
    const { user } = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);
 
    const handleLogout = async () => {
      try {
        await signOut(auth);
        await AsyncStorage.removeItem("user");
        router.replace("/login");
      } catch (err) {
        alert("Logout Error: " + err.message);
      }
    };
 
    return (
      <View style={styles.container}>
        <Text style={styles.header}>👤 Profile</Text>
 
        <View style={styles.infoBox}>
          <Ionicons name="mail" size={20} color="#007bff" style={styles.icon} />
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>
 
        <View style={styles.infoBox}>
          <Ionicons
            name="finger-print"
            size={20}
            color="#9b59b6"
            style={styles.icon}
          />
          <Text style={styles.label}>UID:</Text>
          <Text style={styles.value}>{user?.uid}</Text>
        </View>
 
        {/* Logout Button */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.logoutButton}
        >
          <Ionicons name="log-out-outline" size={18} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
 
        {/* Logout Confirmation Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirm Logout</Text>
              <Text style={styles.modalMessage}>
                Are you sure you want to log out?
              </Text>
 
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.modalButton, { backgroundColor: "#e74c3c" }]}
                  onPress={handleLogout}
                >
                  <Text style={styles.modalButtonText}>Logout</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 28,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      fontSize: 28,
      fontWeight: "700",
      marginBottom: 40,
      color: "#333",
    },
    infoBox: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      flexWrap: "wrap",
      paddingHorizontal: 10,
      justifyContent: "center",
    },
    icon: {
      marginRight: 8,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      marginRight: 6,
      color: "#333",
    },
    value: {
      fontSize: 16,
      color: "#555",
      flexShrink: 1,
    },
    logoutButton: {
      marginTop: 40,
      flexDirection: "row",
      backgroundColor: "#e74c3c",
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 25,
      alignItems: "center",
      gap: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
    },
    logoutText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.3)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: 300,
      backgroundColor: "#fff",
      padding: 24,
      borderRadius: 16,
      alignItems: "center",
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 10,
    },
    modalMessage: {
      fontSize: 16,
      color: "#555",
      marginBottom: 20,
      textAlign: "center",
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      gap: 10,
    },
    modalButton: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: "center",
    },
    modalButtonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
    },
  });
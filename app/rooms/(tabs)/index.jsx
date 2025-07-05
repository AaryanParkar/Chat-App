import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../../../firebase";

export default function RoomList() {
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null); // Track which room to delete

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "chatRooms"), (snapshot) => {
      setRooms(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const createRoom = async () => {
    if (roomName.trim()) {
      await addDoc(collection(db, "chatRooms"), {
        name: roomName.trim(),
        createdAt: serverTimestamp(),
      });
      setRoomName("");
    } else {
      Alert.alert("Please enter a valid room name.");
    }
  };

  const handleDeleteRoom = async () => {
    if (!selectedRoomId) return;
    try {
      await deleteDoc(doc(db, "chatRooms", selectedRoomId));
      setModalVisible(false);
      setSelectedRoomId(null);
    } catch (error) {
      Alert.alert("Error", "Failed to delete room.");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📚 Chat Rooms</Text>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter room name"
          value={roomName}
          onChangeText={setRoomName}
          style={styles.input}
        />
        <TouchableOpacity style={styles.createButton} onPress={createRoom}>
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 10 }}
        renderItem={({ item }) => (
          <View style={styles.roomCard}>
            <TouchableOpacity
              onPress={() => router.push(`/rooms/${item.id}`)}
              style={styles.flex}
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={18}
                color="#fff"
              />
              <Text style={styles.roomName}>{item.name}</Text>
              {/* Optionally format createdAt */}
              {/* <Text style={styles.roomName}>
                {item.createdAt?.toDate
                  ? item.createdAt.toDate().toLocaleString()
                  : ""}
              </Text> */}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelectedRoomId(item.id);
                setModalVisible(true);
              }}
              style={styles.deleteButton}
            >
              <Ionicons name="trash-outline" size={20} color="#ff4d4f" />
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedRoomId(null);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Room</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete room?
            </Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                onPress={() => {
                  setModalVisible(false);
                  setSelectedRoomId(null);
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, { backgroundColor: "#e74c3c" }]}
                onPress={handleDeleteRoom}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
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
    padding: 24,
    backgroundColor: "#fff",
    paddingTop: 64,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },
  createButton: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: "center",
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  roomCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  roomName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  roomCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteButton: {
    padding: 8,
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
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { auth, db } from "../../firebase";

export default function ChatScreen() {
  const { roomId } = useLocalSearchParams();
  const navigation = useNavigation();
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);

  const messagesRef = collection(db, "chatRooms", roomId, "messages");

  useEffect(() => {
    const fetchRoomName = async () => {
      const docSnap = await getDoc(doc(db, "chatRooms", roomId));
      const roomName = docSnap.exists()
        ? docSnap.data().name
        : `Room: ${roomId}`;
      navigation.setOptions({ title: roomName });
    };
    fetchRoomName();
  }, [navigation, roomId]);

useEffect(() => {
  const q = query(messagesRef, orderBy("createdAt"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMessages(data);
  });

  return unsubscribe;
}, [messagesRef]);

  const sendMessage = async () => {
    if (msg.trim()) {
      await addDoc(messagesRef, {
        text: msg,
        createdAt: serverTimestamp(),
        user: {
          id: auth.currentUser?.uid,
          email: auth.currentUser?.email,
        },
      });
      setMsg("");
    }
  };

  const formatTime = (timestamp) => {
    try {
      if (!timestamp?.toDate) return "";
      const date = timestamp.toDate();
      return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
    } catch {
      return "";
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <SafeAreaView style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => {
            const isMe = item.user?.id === auth.currentUser?.uid;
            return (
              <View
                style={[
                  styles.messageBubble,
                  isMe ? styles.myMessage : styles.otherMessage,
                ]}
              >
                <Text style={styles.sender}>
                  {isMe ? "You" : item.user?.email}
                </Text>
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.timestamp}>
                  {formatTime(item.createdAt)}
                </Text>
              </View>
            );
          }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          keyboardShouldPersistTaps="handled"
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            value={msg}
            onChangeText={setMsg}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messageBubble: {
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    maxWidth: "80%",
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#9c9ca1",
  },
  sender: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    color: "#fff",
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
    color: "#ccc",
    alignSelf: "flex-end",
  },
  inputRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 8,
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
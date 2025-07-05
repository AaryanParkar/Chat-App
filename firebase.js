
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 👉 Import config from config.js which reads from app.json via expo-constants
import ENV from "./config";

// ✅ Use values from ENV (which reads from app.json)
const firebaseConfig = {
  apiKey: ENV.firebase.apiKey,
  authDomain: ENV.firebase.authDomain,
  projectId: ENV.firebase.projectId,
  storageBucket: ENV.firebase.storageBucket,
  messagingSenderId: ENV.firebase.messagingSenderId,
  appId: ENV.firebase.appId,
  measurementId: ENV.firebase.measurementId,
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Authentication with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// ✅ Initialize Firestore Database
export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3jhwxzHs9qW6TVKNaXi-hbtCynZFFIDk",
  authDomain: "chat-app-6616b.firebaseapp.com",
  projectId: "chat-app-6616b",
  storageBucket: "chat-app-6616b.firebasestorage.app",
  messagingSenderId: "591481723349",
  appId: "1:591481723349:web:b1d11337591b4aa3da455c",
  measurementId: "G-TW0GFEL77Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initalize Authentication
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),// Use local persistence for authentication
});

// Initialize Firebase Database
export const db = getFirestore(app);
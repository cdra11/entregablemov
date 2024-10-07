// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4UbDA6IPOvARZV8Sf0jRk_pI8NP26Suc",
  authDomain: "moviles-a8b90.firebaseapp.com",
  projectId: "moviles-a8b90",
  storageBucket: "moviles-a8b90.appspot.com",
  messagingSenderId: "244704859395",
  appId: "1:244704859395:web:d19774fa7a0a8c4febc536"
};
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Initialize Firebase
export const auth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
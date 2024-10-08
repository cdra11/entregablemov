// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4UbDA6IPOvARZV8Sf0jRk_pI8NP26Suc",
  authDomain: "moviles-a8b90.firebaseapp.com",
  projectId: "moviles-a8b90",
  storageBucket: "moviles-a8b90.appspot.com",
  messagingSenderId: "244704859395",
  appId: "1:244704859395:web:d19774fa7a0a8c4febc536",
  databaseURL:"https://moviles-a8b90-default-rtdb.firebaseio.com/"
};
// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
//export const auth = getAuth(firebase);
export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// Initialize Realtime Database and get a reference to the service
export const dbRealTime = getDatabase(firebase);
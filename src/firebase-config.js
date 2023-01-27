// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuaZR_86clfIUS4U7vnKbRGK4USMQVTUE",
  authDomain: "blogproject-87cc2.firebaseapp.com",
  projectId: "blogproject-87cc2",
  storageBucket: "blogproject-87cc2.appspot.com",
  messagingSenderId: "68378106335",
  appId: "1:68378106335:web:e4c94beb80b9e7d8c78c6a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

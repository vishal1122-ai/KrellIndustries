// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBk4fgb33tKfey6p5YK-P4d2wb06kktLig",
  authDomain: "krellportal.firebaseapp.com",
  projectId: "krellportal",
  storageBucket: "krellportal.firebasestorage.app",
  messagingSenderId: "796875366262",
  appId: "1:796875366262:web:1f23617ebb4679d157a457",
  measurementId: "G-W97JF9T5GH",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

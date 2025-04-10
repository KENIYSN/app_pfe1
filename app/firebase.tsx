// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3wVp9rOjfJgXhDZJKAHnFkPsjP6RpkWg",
  authDomain: "apppfe-56e58.firebaseapp.com",
  projectId: "apppfe-56e58",
  storageBucket: "apppfe-56e58.firebasestorage.app",
  messagingSenderId: "785051339321",
  appId: "1:785051339321:web:9d9940112b8ea36b9bdbe8",
  measurementId: "G-74PJMPE0D2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
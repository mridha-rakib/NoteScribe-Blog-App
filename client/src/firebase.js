// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "notescribe-blog.firebaseapp.com",
  projectId: "notescribe-blog",
  storageBucket: "notescribe-blog.appspot.com",
  messagingSenderId: "528774000411",
  appId: "1:528774000411:web:2c52d290ebeffee1c12dbe",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

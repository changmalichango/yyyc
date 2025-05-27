// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkXX7cYmcKqdLh3eOFq9zTjb1d8ZYh0Pk",
  authDomain: "yyyc-48707.firebaseapp.com",
  projectId: "yyyc-48707",
  storageBucket: "yyyc-48707.firebasestorage.app",
  messagingSenderId: "44191980631",
  appId: "1:44191980631:web:406b03c47b79f6e9ab1712",
  measurementId: "G-KDJES4YY5F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

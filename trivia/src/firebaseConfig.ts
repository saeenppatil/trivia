// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxFwTXhd2qzvshaHhdC1TrCSW2BGl8tgk",
  authDomain: "trivia-f7176.firebaseapp.com",
  projectId: "trivia-f7176",
  storageBucket: "trivia-f7176.appspot.com",
  messagingSenderId: "897896598617",
  appId: "1:897896598617:web:7d9924ecd4066a773cf548",
  measurementId: "G-0MFF7NJL9C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

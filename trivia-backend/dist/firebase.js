"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const analytics_1 = require("firebase/analytics");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = (0, app_1.initializeApp)(firebaseConfig);
const analytics = (0, analytics_1.getAnalytics)(app);
exports.auth = (0, auth_1.getAuth)(app);
exports.db = (0, firestore_1.getFirestore)(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBVZkPwoUdqkq51eK3lWMu7-iBNfVJnFD0",
    authDomain: "nami-app-38038.firebaseapp.com",
    projectId: "nami-app-38038",
    storageBucket: "nami-app-38038.firebasestorage.app",
    messagingSenderId: "579889653667",
    appId: "1:579889653667:web:b8fc2cdd174dc0fd7a1c16",
    measurementId: "G-9MW56N4GZ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

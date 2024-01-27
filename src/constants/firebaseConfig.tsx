// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import dotenv from "dotenv";

// Check if userConfig exists in localStorage
const userConfig = localStorage.getItem("userConfig");

let firebaseConfig;

console.log("userConfig:", userConfig);

// Use userConfig if available, otherwise use the default config
if (userConfig !== null) {
    console.log("Using userConfig");
    try {
        firebaseConfig = JSON.parse(userConfig);
    } catch (error) {
        console.error("Error parsing userConfig:", error);
        // Use the default config if parsing fails
        firebaseConfig = {
            apiKey: process.env.REACT_APP_APIKEY,
            authDomain: process.env.REACT_APP_AUTHDOMAIN,
            projectId: process.env.REACT_APP_PROJECTID,
            storageBucket: process.env.REACT_APP_STORAGEBUCKET,
            messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
            appId: process.env.REACT_APP_APPID,
            measurementId: process.env.REACT_APP_MEASUREMENTID,
        };
    }
} else {
    // Use the default config if userConfig is not available
    firebaseConfig = {
        apiKey: process.env.REACT_APP_APIKEY,
        authDomain: process.env.REACT_APP_AUTHDOMAIN,
        projectId: process.env.REACT_APP_PROJECTID,
        storageBucket: process.env.REACT_APP_STORAGEBUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
        appId: process.env.REACT_APP_APPID,
        measurementId: process.env.REACT_APP_MEASUREMENTID,
    };
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const db = getFirestore(app);

export { auth, provider, db };

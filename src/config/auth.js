// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
    apiKey: "***********",
    authDomain: "***************",
    projectId: "************",
    storageBucket: "******************",
    messagingSenderId: "***************",
    appId: "**********************",
    measurementId: "***************"
});

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// auth functions

export const logout = () => {
    signOut(auth).then(() => {
        localStorage.removeItem('user')
        window.location.reload()
    }).catch((error) => {
        console.log(error)
    });
}
export const googleProvider = new GoogleAuthProvider()

export const passwordReset = (email) => {
    sendPasswordResetEmail(auth, email).then(() => {
        alert('Password Reset Email Sent')
    }).catch((error) => {
        console.log(error)
    });
}

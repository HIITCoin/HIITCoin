// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE3pzg38mjnVmtilI0F4LMZ6pb8r4dGIo",
  authDomain: "hiitcoin-d8648.firebaseapp.com",
  projectId: "hiitcoin-d8648",
  storageBucket: "hiitcoin-d8648.appspot.com",
  messagingSenderId: "132240151957",
  appId: "1:132240151957:web:82b212e0d21a3c2133529c",
};

// Initialize Firebase

let app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app)

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged };

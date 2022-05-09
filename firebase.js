// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, getDocs, query } from "firebase/firestore";
// import { seedDb } from './seed';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

// App's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE3pzg38mjnVmtilI0F4LMZ6pb8r4dGIo",
  authDomain: "hiitcoin-d8648.firebaseapp.com",
  projectId: "hiitcoin-d8648",
  storageBucket: "hiitcoin-d8648.appspot.com",
  messagingSenderId: "132240151957",
  appId: "1:132240151957:web:82b212e0d21a3c2133529c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

const colRef = collection(db, "Exercises");
const q = query(collection(db, "Exercises"));
// Seed the exercises. Won't seed if exercises collection contains exercises documents.
async function seedDb() {
  let length = 0; // dummy counter will reflect amount of docs in the collection
  const exercisesSnap = await getDocs(q); // obtain snapshot of the exercises collection
  exercisesSnap.forEach(() => { // for each item in the colletion...
    length++;                   // ... increment lenght by 1
  });
  if (length === 0) { // if length remained 0, then db is not seeded, so we will seed it
    addDoc(colRef, {
      basePoints: 10,
      bodyPart: 'full-body',
      difficulty: 3,
      name: 'Deadlift',
    });
  } else console.log("The exercises collection is already seeded, mate.")
}
seedDb();

export { firebaseConfig, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged };

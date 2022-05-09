import { getFirestore, addDoc, collection, getDocs, query } from "firebase/firestore";

const db = getFirestore();

const colRef = collection(db, "Exercises");
const q = query(collection(db, "Exercises"));

export const seedDb = async () => {
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

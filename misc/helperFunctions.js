//utility functions contained here e.g. queries
import { db, auth } from "../firebase";
import {
  setDoc,
  doc,
  Timestamp,
  getDocs,
  query,
  collection,
  addDoc,
} from "firebase/firestore";
export const makeUser = async (user) => {
  await setDoc(doc(db, "Users", user.id), {
    firstName: user.firstName,
    lastName: user.lastName,
    height: user.height,
    weight: user.weight,
    age: user.age,
    points: 0,
    startDate: Timestamp.fromDate(new Date()),
    workouts: [],
  });
  createHistory()
};
//add a workouthistory subcollection here
// let col = getDocs(
//   //gets entire workout history for one user
//   query(collection(db, "Users", auth.currentUser.uid, "Workout-History"))
// ).then((snapshot) => snapshot.docs.forEach((doc) => console.log(doc.data())));
//get user doc by id (auth)
//set doc in user doc at new collection name
// const history = collection(
//   db,
//   "Users",
//   auth.currentUser.uid,
//   "Workout-History",
// )
//get a list of all user workouts
//get indidual workout
//submit workout to workout history(attach date to workout)
//get workout history
//add new workout to workouts list
//(delete workout)
//edit a workout
//points
//add points to user points
//workout history has point fields for all body areas?
//change user info

//exercises
//get an array of all exercises by name
//get single exercise by name

//set workout history for particular user on creation
//get user
 export const createHistory = async () => {
   await addDoc(
    collection(db, "Users", auth.currentUser.uid, "Workout-History"),
    {
      workouts: [],
    }
  );
};


// const history = await getDocs(
//     collection(db, "Users", auth.currentUser.uid, "Workout-History")
//   ).then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       setDoc(doc, { workouts: ["yay"] });
//     });
//   });
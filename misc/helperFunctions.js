//utility functions contained here e.g. queries
import { db, auth } from "../firebase";
import {
  setDoc,
  doc,
  Timestamp,
  getDocs,
  getDoc,
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
//get user doc by id (auth)
export const getUser = async () => {
    const user = await getDoc(doc(db, 'Users', auth.currentUser.uid))
    return user.data()
}
//Andrey
//get a list of all user workouts
//get individual workout
//add new workout to workouts list
//(delete workout from workouts list)
//edit a workout
//get an array of all exercises by name
//get single exercise by name

//Khalid
//submit workout to workout history(attach date to workout)
//get workout history
//add points to user points
//workout history has point fields for all body areas?
//change user info

//exercises


 export const createHistory = async () => {
   await addDoc(
    collection(db, "Users", auth.currentUser.uid, "Workout-History"),
    {
      workouts: [],
    }
  );
};


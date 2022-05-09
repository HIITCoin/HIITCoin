//utility functions contained here e.g. queries 
import { db, auth } from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
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
      //add a subcollection here
}

//get a list of all 
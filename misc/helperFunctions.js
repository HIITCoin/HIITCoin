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
      //add a workouthistory subcollection here
}

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
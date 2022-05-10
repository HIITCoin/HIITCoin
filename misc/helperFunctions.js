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
  serverTimestamp
} from "firebase/firestore";
export const makeUser = async (user) => {
  const user2 = await setDoc(doc(db, "Users", user.id), {
    firstName: user.firstName,
    lastName: user.lastName,
    height: user.height,
    weight: user.weight,
    age: user.age,
    points: 0,
    startDate: Timestamp.fromDate(new Date()),
    workouts: [],
  });
  console.log(user);
};
//get user doc by id (auth)
export const getUser = async () => {
  //check local user
  //if not local then db query
  //set local
  const user = await getDoc(doc(db, "Users", auth.currentUser.uid));
  //set storage
  return user.data();
};
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

//get workout history as an array of workout objects
export const getWorkoutHistory = async () => {
  try {
    const history = await getDocs(
      collection(db, "Users", auth.currentUser.uid, "Workout-History")
    );
    const historyArray = history.docs.map((doc) => ({ ...doc.data() }));
    return historyArray;
  } catch (error) {
    console.log(error);
  }
};

//change user info
//returns an array that contains 1. total points gained in workout
//2. breakdown of points by body part
export function calculatePoints(workout) {
  let total = 0;
  let bodyPoints = {
    abs: 0,
    chest: 0,
    legs: 0,
    back: 0,
    arms: 0,
    "butt/hips": 0,
    fullbody: 0,
    lowerLegs: 0,
    neck: 0,
    shoulders: 0,
    thighs: 0,
  };
  const { exercises } = workout;
  exercises.forEach((exercise) => {
    let exTotal = exercise.sets * exercise.basePoints * workout.rounds;
    total += exTotal;
    bodyPoints[`${exercise.bodyPart}`] += exTotal;
  });
  return [total, bodyPoints];
}

//exercises

export const createOrSubmitHistory = async (workout) => {
  const [total, bodyPoints] = calculatePoints(workout);
  const { rounds, roundRest, exercises } = workout;
  const workoutHistory = {
    total,
    bodyPoints,
    rounds,
    roundRest,
    exercises,
    date: serverTimestamp(), //change to server timestamp
  };
  await addDoc(
    collection(db, "Users", auth.currentUser.uid, "Workout-History"),
    workoutHistory
  );
  return workoutHistory;
};
//what does a workout into workout history look like
//user creates workout
//user selects workout from workoutlist
//user presses begin
//timer renders with display of how many sets
//completed/total # of sets and current activty(exercise,rest)
//user presses start
//user can pause at any time (does timer automatically start between new timers eg. finished set timer
//now resting timer begins)
//when workout ends, user can choose to submit workout to db
//if they submit, the points from the workout are calculated and added to the
//workout history object
//user's total points are updated
//regardless of choice user is navigated back to home page

//misc
//birthday

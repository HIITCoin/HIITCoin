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
  where,
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
//get user doc by id (auth)✅
export const getUser = async () => {
  //check local user
  //if not local then db query
  //set local
  const user = await getDoc(doc(db, "Users", auth.currentUser.uid));
  //set storage
  return user.data();
};
//change user info
export const editUser = async (newData) => {
  const user = await getUser();
  console.log(user)
  await setDoc(doc(db, "Users", auth.currentUser.uid), {...user, newData}, {merge: true})
  const afterUser = await getUser()
  console.log(afterUser)
}
//Andrey
//get a list of all user workouts
export const getUserWorkouts = async () => {
  const userData = await getDoc(doc(db, 'Users', auth.currentUser.uid));
  return userData.data().workouts;
}

//get individual workout✅
export const getSingleWorkout = async (workoutName) => {
  const workouts = await getUserWorkouts();
  let workout = workouts.filter((work) => work.name === workoutName)
  return workout[0];
}

//add new workout to workouts list✅
export const addNewWorkout = async (newWorkout) => {
  const userRef = doc(db, 'Users', auth.currentUser.uid);
  const userWorkouts = await getUserWorkouts();
  setDoc(userRef, { workouts: [...userWorkouts, newWorkout] }, { merge: true });
}

//delete workout from workouts list ✅
export const deleteWorkout = async (workoutName) => {
  const userRef = doc(db, 'Users', auth.currentUser.uid);
  const userWorkouts = await getUserWorkouts();
  const newUserWorkouts = userWorkouts.filter((work) => work.name !== workoutName)
  setDoc(userRef, { workouts: [...newUserWorkouts] }, { merge: true });
}

//edit a workout (SAME AS ADD NEW WORKSHOP?)
export const editWorkout = async (workout) => {
  const userRef = doc(db, 'Users', auth.currentUser.uid);
  const oldData = await getUserWorkouts();
  setDoc(userRef, { workouts: [...oldData, workout] }, { merge: true });
}

//get an array of all exercises by name✅
export const getExercises = async () => {
  let exercises = []; // resultant array
  const exercisesRef = collection(db, "Exercises"); // obtaining reference to exercises
  const exercisesQuery = query(exercisesRef); // querying to read from exercises collection
  const exercisesSnapshot = await getDocs(exercisesQuery);
  exercisesSnapshot.forEach((exercise) => { // for each item in the colletion...
    exercises.push(exercise.data()); // ...
  });
  return exercises;
}

//get single exercise by name✅
export const getSingleExercise = async (exerciseName) => {
  let exercise = [];
  const exercisesRef = collection(db, "Exercises");
  const exercisesQuery = query(exercisesRef, where("name", "==", exerciseName));
  const exercisesSnapshot = await getDocs(exercisesQuery);
  exercisesSnapshot.docs.forEach((exer) => {
    exercise.push(exer.data())
  })
  return exercise[0];
}

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
  const { rounds, roundRest, exercises, name } = workout;
  const workoutHistory = {
    name,
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

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
export const getUserWorkouts = async () => {
  const userData = await getDoc(doc(db, 'Users', auth.currentUser.uid));
  return userData.data().workouts;
}

//get individual workout (almost there, need to query deeper)
export const getSingleWorkout = async (workoutName) => {
  let workout = [];
  const workoutsRef = collection(db, "Exercises");
  const workoutsQuery = query(workoutsRef, where("name", "==", workoutName));
  const workoutsSnapshot = await getDocs(workoutsQuery);
  workoutsSnapshot.docs.forEach((work) => {
    workout.push(work.data())
  })
  return workout[0];
}

//add new workout to workouts list
export const addNewWorkout = async (workout) => {
  const userRef = doc(db, 'Users', auth.currentUser.uid);
  const oldData = await getUserWorkouts();
  setDoc(userRef, { workouts: [...oldData, workout] }, { merge: true });
}

//(delete workout from workouts list)
//edit a workout (SAME AS ADD NEW WORKSHOP?)
export const editWorkout = async (workout) => {
  const userRef = doc(db, 'Users', auth.currentUser.uid);
  const oldData = await getUserWorkouts();
  setDoc(userRef, { workouts: [...oldData, workout] }, { merge: true });
}

//get an array of all exercises by name
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

//get single exercise by name
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


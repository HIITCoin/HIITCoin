//sample user
const user = {
  firstName: "Mario",
  lastName: "Jumpman",
  height: 40,
  weight: 250,
  age: 47,
  points: 0,
  startDate: new Date(),
  workouts: [],
};
//sample exercise from -exercise collection-
const exercise = {
  name: "Chest Press",
  difficulty: 3,
  basePoints: 10,
  bodyPart: "chest",
};
//sample exercise in -workout- //
export const exerciseInWorkout = {
  name: "Chest Press",
  difficulty: 3,
  basePoints: 10,
  bodyPart: "chest",
  sets: 3,
  reps: 12,
  duration: 100,
  rest: 45,
};
export const exerciseInWorkout2 = {
  name: "Leg Press",
  difficulty: 3,
  basePoints: 10,
  bodyPart: "butt/hips",
  sets: 4,
  reps: 12,
  duration: 100,
  rest: 45,
};
//sample workout in a user's -workout list-
export const sampleWorkoutInList = {
  exercises: [exerciseInWorkout, exerciseInWorkout2],
  name: "sample workout name",
  rounds: 2,
  roundRest: 100,
};
//sample workout in user -workout-history-
export const sampleWorkoutInHistory = {
  name: "sample workout name",
  total: 0,
  bodyPoints: {},
  exercises: [exerciseInWorkout, exerciseInWorkout2],
  rounds: 2,
  roundRest: 100,
  date: new Date(),
};
export const sampleWorkoutInHistory2 = {
  name: "sample workout name",
  total: 0,
  bodyPoints: {},
  exercises: [exerciseInWorkout],
  rounds: 2,
  roundRest: 100,
  date: new Date("May 5, 2022 23:15:30"),
};
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

//fix the prmise object here ??
const createOrSubmitHistory = async (workout) => {
  const [total, bodyPoints] = calculatePoints(workout);
  const { rounds, roundRest, exercises } = workout;
  const workoutHistory = {
    total,
    bodyPoints,
    rounds,
    roundRest,
    exercises,
    date: new Date(), //change to server timestamp
  };
  //await -insert database operation - with workout History
  return workoutHistory;
};

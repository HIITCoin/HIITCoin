import { Pressable } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { KeyboardAvoidingView, Text, VStack, Box, HStack } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  addNewWorkout,
  calculatePoints,
  getSingleWorkout,
  createOrSubmitHistory,
} from "../misc/helperFunctions";

/* CUSTOM HOOK */
const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

// const workout = {
//   name: "testworkout",
//   exercises: [
//     {
//       name: "Leg Press",
//       basePoints: 10,
//       bodyPart: "legs",
//       difficulty: 3,
//       duration: 4,
//       reps: 8,
//       sets: 2,
//       rest: 2,
//     },
//     {
//       name: "Chest Press",
//       basePoints: 10,
//       bodyPart: "chest",
//       difficulty: 2,
//       duration: 8,
//       reps: 4,
//       sets: 3,
//       rest: 5,
//     },
//   ],
//   rounds: 3,
//   roundRest: 10,
// };
//        (props)
const Timer = ({ route }) => {
  // obtain workout prop from the workout component
  const navigation = useNavigation();
  console.log(route);
  if (!route.params) {
    navigation.navigate("Home");
  }

  const workout = route.params.workout;

  const [myWorkout, setMyWorkout] = useState(workout);
  const [exerName, setExerName] = useState("Quick Timer");
  const [exerSets, setExerSets] = useState(workout.exercises.sets);
  const [exerReps, setExerReps] = useState(workout.exercises.reps);
  const [rounds, setRounds] = useState(workout.rounds);
  const [timerOn, setTimerOn] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [restToggle, setRestToggle] = useState(false); // start with exercise then switch to rest
  const [roundRest, setRoundRest] = useState(false);
  const [exerIndex, setExerIndex] = useState(0);
  const [timer, setTimer] = useState(); // timer interval?
  const savedCallback = useRef();

  useEffect(() => {
    console.log("initial Loading");

    // const startWkout = async () => {
    //   setExerName(myWorkout.exercises[0].name);
    //   setExerSets(myWorkout.exercises[0].sets);
    //   setExerReps(myWorkout.exercises[0].reps);
    //   setSeconds(myWorkout.exercises[0].duration);
    //   console.log(
    //     myWorkout.exercises ? "wkout state is loaded" : "hit save again"
    //   );
    // };
    // startWkout();
    setNextWorkout();
  }, []);

  useInterval(
    async () => {
      for (let i = seconds; i === 0; i--) {
        let currentExercise;
        if (roundRest) {
          setRoundRest(false);
          if (i > 0) {
            setSeconds(i - 1);
            continue; // stop here
          }
          // we set to seconds to rest but dont let them elapse
          currentExercise = myWorkout.exercises[0];
          await setExerIndex(0);
        }
      }

      if (seconds > 0) {
        setSeconds(seconds - 1);
        return; // stop here
      }

      let currentExercise = myWorkout.exercises[exerIndex];
      if (restToggle) {
        // if we're resting, then set seconds to duration and switch restToggle afterwards
        setSeconds(currentExercise.duration);
        setRestToggle(!restToggle);
      } else {
        // if we're exercising, then set seconds to rest AND (decrease sets OR change exercise and switch off timer)
        setSeconds(currentExercise.rest);
        if (exerSets > 1) {
          setExerSets((sets) => sets - 1); // we can set to 1, that is our LAST set. When we are AT 1, the next "set" moves to the next workout
          setRestToggle(!restToggle);
        } else {
          setExerIndex(exerIndex + 1);
          setTimerOn(false); // stop timer (THIS TRIGGERS THIS HOOK TO RUN AGAIN)
        }
      }
    },
    timerOn ? 300 : null
  );

  useEffect(() => {
    if (exerIndex < myWorkout.exercises.length) setNextWorkout();
    else {
      // if no more exercises left AND there are more rounds...
      if (rounds > 1) {
        // ...then let the user roundRest and then loop them again thru exercises
        setRounds((rounds) => rounds - 1);
        setSeconds(myWorkout.roundRest);
        setRoundRest(true);
        setExerName("Next round begins in:");
        setTimerOn(true); // this will trigger the useInterval to run again
      } else {
        setSeconds(0);
        setExerName("Done! Good job!");
        setExerReps(0);
        setExerSets(0);
        console.log("SUBMIT WORKOUT");
        //get workout object workout
        console.log(workout);
        const submit = async () => {
          await createOrSubmitHistory(workout);
        };
        submit();
      }
    }
  }, [exerIndex]);

  function setNextWorkout() {
    if (restToggle) setRestToggle(false);
    setExerName(myWorkout.exercises[exerIndex].name);
    setExerSets(myWorkout.exercises[exerIndex].sets);
    setExerReps(myWorkout.exercises[exerIndex].reps);
    setSeconds(myWorkout.exercises[exerIndex].duration);
  }
  // if (myWorkout.exercises.length) {
  // for (let i = 0; i < myWorkout.exercises.length; i++) {
  // console.log(i, "im logging");
  // if (i != 0) {
  //   setExerName(myWorkout.exercises[i].name);
  //   setExerSets(myWorkout.exercises[i].sets);
  //   setExerReps(myWorkout.exercises[i].reps);
  //   // setSecondsLeft();
  // }

  // convert seconds left => , hours, minutes, seconds
  const clockify = () => {
    let hours = Math.floor(seconds / 60 / 60);
    let mins = Math.floor((seconds / 60) % 60);
    let secs = Math.floor(seconds % 60);
    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMinutes = mins < 10 ? `0${mins}` : mins;
    let displaySeconds = secs < 10 ? `0${secs}` : secs;
    return { displayHours, displayMinutes, displaySeconds };
  };

  //either call this on press of play the first time || give a begin workout button
  // const beginWorkout = () => {
  //   while (exerSets != 0) {
  //     startTimer();
  //     // startRest(); define this
  //     setExerSets(exerSets - 1);
  //   }
  // };

  return (
    <KeyboardAvoidingView bg="colors.bg" height="100%">
      <Box marginTop="20%" marginBottom="5%">
        <Text fontSize="5xl" color="colors.text" textAlign="center">
          Timer
        </Text>
      </Box>
      <VStack space={5} alignItems="center" bg="colors.bg">
        <Box w="100%" h="20" bg="colors.bg" justifyContent="center">
          <Text fontSize="4xl" color="colors.other" textAlign="center">
            {restToggle ? "Rest! Next set starts in:" : exerName}
          </Text>
        </Box>
        <Box w="100%" h="10" bg="colors.bg" justifyContent="center">
          <Text fontSize="3xl" color="colors.other" textAlign="center">
            Sets left: {exerSets}
          </Text>
        </Box>
        <Box w="100%" h="10" bg="colors.bg" justifyContent="center">
          <Text fontSize="3xl" color="colors.other" textAlign="center">
            Reps: {exerReps}
          </Text>
        </Box>
        <Box w="100%" h="40" bg="colors.bg" justifyContent="center">
          <Text fontSize="9xl" color="colors.other" textAlign="center">
            {clockify().displayMinutes}:{clockify().displaySeconds}
          </Text>
        </Box>
        <HStack justifyContent="space-between">
          <Pressable onPress={() => setTimerOn(true)}>
            <FontAwesome name="play" size={130} color="green" />
          </Pressable>
          <Pressable onPress={() => setTimerOn(false)}>
            <FontAwesome name="pause" size={130} color="yellow" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Home")}>
            <FontAwesome name="stop" size={130} color="red" />
          </Pressable>
        </HStack>
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default Timer;

import { Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Text, VStack, Box, HStack } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { addNewWorkout, getSingleWorkout } from "../misc/helperFunctions";

const workout = {
  name: "testworkout",
  exercises: [
    {
      name: "Leg Press",
      basePoints: 10,
      bodyPart: "legs",
      difficulty: 3,
      duration: 4,
      reps: 8,
      sets: 2,
      rest: 2,
    },
    {
      name: "Chest Press",
      basePoints: 10,
      bodyPart: "chest",
      difficulty: 2,
      duration: 10,
      reps: 4,
      sets: 3,
      rest: 5,
    },
  ],
  rounds: 3,
  roundRest: 10,
};
//        (props)
const Timer = () => {
  // obtain workout prop from the workout component
  const navigation = useNavigation();
  //const workout = this.props.
  const [myWorkout, setMyWorkout] = useState(workout);
  const [exerName, setExerName] = useState("Quick Timer");
  const [exerSets, setExerSets] = useState(workout.exercises.sets);
  const [exerReps, setExerReps] = useState(workout.exercises.reps);
  const [timerOn, setTimerOn] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [exerIndex, setExerIndex] = useState(0);

  useEffect(() => {
    console.log("initial Loading");
    const startWkout = async () => {
      // console.log(
      //   "addNewWorkout",
      //   await addNewWorkout({
      //     name: "testworkout",
      //     exercises: [
      //       {
      //         name: "Leg Press",
      //         basePoints: 10,
      //         bodyPart: "legs",
      //         diffuculty: 3,
      //         duration: 70,
      //         reps: 8,
      //         sets: 4,
      //         rest: 55,
      //       },
      //       {
      //         name: "Chest Press",
      //         basePoints: 10,
      //         bodyPart: "chest",
      //         diffuculty: 2,
      //         duration: 65,
      //         reps: 4,
      //         sets: 6,
      //         rest: 75,
      //       },
      //     ],
      //     rounds: 3,
      //     roundRest: 90,
      //   })
      // );
      // setMyWorkout(await getSingleWorkout("testworkout"));
      setExerName(myWorkout.exercises[0].name);
      setExerSets(myWorkout.exercises[0].sets);
      setExerReps(myWorkout.exercises[0].reps);
      setSeconds(myWorkout.exercises[0].duration);
      console.log(
        myWorkout.exercises ? "wkout state is loaded" : "hit save again"
      );
    };
    startWkout();
  }, []);

  useEffect(() => {
    let interval;
    if (timerOn) {
      interval = setInterval(() => {
        clearInterval(interval);

        if (seconds === 0) {
          // if (minutes !== 0) {
          //   setSeconds(59);
          //   setMinutes(minutes - 1);
          // } else {
          let seconds = displayMessage
            ? myWorkout.exercises[exerIndex].duration
            : myWorkout.exercises[exerIndex].rest;

          setSeconds(seconds);
          setMinutes(0);
          // if (!displayMessage) {
          if (exerSets === 0) {
            setTimerOn(false);
            console.log("exerSets is 0");
            console.log("timer status", timerOn);
            setExerIndex(exerIndex + 1);
            console.log("exerIndex", exerIndex);
            setExerName(myWorkout.exercises[exerIndex].name);
            setExerSets(myWorkout.exercises[exerIndex].sets);
            setExerReps(myWorkout.exercises[exerIndex].reps);
          } else if (exerSets > 0) {
            setExerSets((sets) => sets - 1);
          }
          // }
          setDisplayMessage(!displayMessage);
          // }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!timerOn) {
      clearInterval(interval);
      interval = null;
    }
  }, [seconds, timerOn, exerIndex, exerName, exerSets, exerReps]);

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
            {displayMessage ? "Rest! Next set starts in:" : exerName}
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

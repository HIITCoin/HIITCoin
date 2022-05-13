import { Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Text, VStack, Box, HStack } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { addNewWorkout, getSingleWorkout } from "../misc/helperFunctions";

const Timer = () => {
  // obtain workout prop from the workout component
  const navigation = useNavigation();

  const [myWorkout, setMyWorkout] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [exerName, setExerName] = useState("Quick Timer");
  const [exerSets, setExerSets] = useState(0);
  const [exerReps, setExerReps] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [intervalId, setIntervalId] = useState("null");

  useEffect(async () => {
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
      setMyWorkout(await getSingleWorkout("testworkout"));
      setExerName(myWorkout.exercises[0].name);
      setExerSets(myWorkout.exercises[0].sets);
      setExerReps(myWorkout.exercises[0].reps);
      setSecondsLeft(myWorkout.exercises[0].duration);
      console.log(
        myWorkout.exercises ? "wkout state is loaded" : "hit save again"
      );
    };
    startWkout();
  }, []);

  useEffect(() => {
    if (timerOn) {
      startTimer();
    } else if (!timerOn) {
      stopTimer();
    }
  }, [timerOn]);

  useEffect(() => {
    if (secondsLeft === 0) {
      setTimerOn(false);
    }
  }, [secondsLeft]);

  const startTimer = () => {
    setIntervalId(
      setInterval(() => {
        setSecondsLeft((secs) => {
          if (secs > 0) return secs - 1;
          else return 0;
        });
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  //convert seconds left => , hours, minutes, seconds
  const clockify = () => {
    let hours = Math.floor(secondsLeft / 60 / 60);
    let mins = Math.floor((secondsLeft / 60) % 60);
    let seconds = Math.floor(secondsLeft % 60);
    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMinutes = mins < 10 ? `0${mins}` : mins;
    let displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    return { displayHours, displayMinutes, displaySeconds };
  };

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
            {exerName}
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

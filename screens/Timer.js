import { Pressable, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Text, VStack, Box, HStack } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "../misc/helperFunctions";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
// import { Stopwatch } from "react-native-stopwatch-timer";

const Timer = () => {
  const navigation = useNavigation();

  const [secondsLeft, setSecondsLeft] = useState(60);
  const [timerOn, setTimerOn] = useState(false);

  let intervalId;
  useEffect(() => {
    if (timerOn) startTimer();
    else stopTimer();
    return () => setTimerOn(false);
  }, [timerOn]);

  useEffect(() => {
    if (secondsLeft === 0) {
      setTimerOn(false);
    }
  }, [secondsLeft]);

  const startTimer = () => {
    intervalId = setInterval(() => {
      setSecondsLeft((secs) => {
        if (secs > 0) return secs - 1;
        else return 0;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    intervalId = null;
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
      <VStack space={4} alignItems="center" bg="colors.bg">
        <Box w="100%" h="10" bg="colors.bg" justifyContent="center">
          <Text fontSize="3xl" color="colors.text" textAlign="center">
            1st Set | 4 Sets
          </Text>
        </Box>
        <Box w="100%" h="20" bg="colors.bg" justifyContent="center">
          <Text fontSize="4xl" color="colors.other" textAlign="center">
            Rest
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

import { StyleSheet, View, TouchableOpacity, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Input,
  Box,
  Icon,
  Button,
  Center,
  flex,
  Text,
  keyboardDismissHandlerManager,
  Pressable,
  Badge,
  Spacer,
  Flex,
  HStack,
  ScrollView,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { TouchableWithoutFeedback } from "react-native";
import { getUserWorkouts } from "../misc/helperFunctions";
import { doc, onSnapshot } from "firebase/firestore";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "Users", auth.currentUser.uid),
      (user) => {
        setWorkouts(user.data().workouts);
        console.log(workouts);
      }
    );
    return unsubscribe;
  }, []);

  const navigation = useNavigation();

  const handleNewWorkout = () => {
    navigation.navigate("New Workout");
  };

  const handleSingleWorkout = (workout) => {
    navigation.navigate("Single Workout", { workout: workout });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView bg="colors.bg" height="100%" behavior="padding">
        <Box marginTop="5%" alignSelf="center">
          <Text fontSize="6xl" color="colors.text">
            My Workouts
          </Text>
        </Box>
        <Button
          onPress={handleNewWorkout}
          alignSelf="center"
          marginTop="5%"
          shadow="3"
          bg="colors.text"
          p="5"
          rounded="8"
          width="80%"
        >
          <Text
            alignSelf="center"
            color="white"
            fontWeight="medium"
            fontSize="4xl"
          >
            + New Workout
          </Text>
        </Button>
        <Box>
          {workouts.map((workout) => (
            <Button
              key={workout.name}
              onPress={() => {
                handleSingleWorkout(workout);
              }}
              alignSelf="center"
              marginTop="5%"
              alignSelf="center"
              shadow="3"
              bg="colors.red"
              p="5"
              rounded="8"
              width="80%"
            >
              <Text
                alignSelf="center"
                color="white"
                fontWeight="medium"
                fontSize="4xl"
              >
                {workout.name}
              </Text>
            </Button>
          ))}
        </Box>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Workouts;

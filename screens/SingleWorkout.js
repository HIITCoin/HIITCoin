import { Keyboard } from "react-native";
import React from "react";
import { KeyboardAvoidingView, Box, Button, Text, HStack } from "native-base";
import { useNavigation } from "@react-navigation/core";
import { TouchableWithoutFeedback } from "react-native";
import { ScrollView } from "react-native";
import { deleteWorkout } from "../misc/helperFunctions";

const SingleWorkout = ({ route }) => {
  let workout = route.params.workout;
  const navigation = useNavigation();

  const handleDeleteWorkout = (name) => {
    deleteWorkout(name);
    navigation.navigate("Workouts");
  };

  const handleEditWorkout = () => {
    navigation.navigate("New Workout", { state: workout });
  };

  const handleBeginWorkout = () => {
    navigation.navigate("Timer", { workout: workout });
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView bg="colors.bg" height="100%" behavior="padding">
          <Box marginTop="5%" alignSelf="center">
            <Text fontSize="6xl" color="colors.text" numberOfLines={1}>
              {workout.name}
            </Text>
          </Box>
          <Button
            alignSelf="center"
            marginTop="5%"
            shadow="3"
            bg="colors.text"
            p="5"
            rounded="8"
            width="80%"
            onPress={handleBeginWorkout}
          >
            <Text
              alignSelf="center"
              color="white"
              fontWeight="medium"
              fontSize="4xl"
            >
              Begin Workout
            </Text>
          </Button>
          <HStack justifyContent="center" space={10}>
            <Button
              alignSelf="center"
              marginTop="5%"
              shadow="3"
              bg="colors.text"
              p="5"
              rounded="8"
              width="35%"
              onPress={handleEditWorkout}
            >
              <Text alignSelf="center" color="white" fontSize="4xl">
                Edit
              </Text>
            </Button>
            <Button
              alignSelf="center"
              marginTop="5%"
              shadow="3"
              bg="colors.text"
              p="5"
              rounded="8"
              width="35%"
              onPress={() => handleDeleteWorkout(workout.name)}
            >
              <Text
                alignSelf="center"
                color="white"
                fontWeight="medium"
                fontSize="4xl"
              >
                Delete
              </Text>
            </Button>
          </HStack>

          <Box
            marginTop="5%"
            alignSelf="center"
            rounded="xl"
            width="80%"
            // bg="colors.box"
          >
            <Text
              alignSelf="center"
              color="white"
              fontWeight="medium"
              fontSize="4xl"
            >
              Rounds: {workout.rounds}
            </Text>
          </Box>
          {workout.exercises.map((exercise, index) => (
            <Box
              key={index}
              alignSelf="center"
              marginTop="5%"
              shadow="3"
              bg="colors.box"
              rounded="xl"
              width="80%"
            >
              <Text
                marginTop="5"
                alignSelf="center"
                color="white"
                fontWeight="medium"
                fontSize="4xl"
              >
                {exercise.name}
              </Text>
              <Text
                alignSelf="center"
                color="white"
                fontSize="3xl"
                marginBottom="5"
              >
                {"\n"}Sets: {exercise.sets}
                {"\n"}Reps: {exercise.reps}
                {"\n"}Duration: {exercise.duration} sec.
                {"\n"}Rest: {exercise.rest} sec.
              </Text>
            </Box>
          ))}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default SingleWorkout;

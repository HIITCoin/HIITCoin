import { Keyboard, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Button, Text, ScrollView, HStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { TouchableWithoutFeedback } from "react-native";
import { doc, onSnapshot } from "firebase/firestore";

const Workouts = () => {
  const navigation = useNavigation();
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "Users", auth.currentUser.uid),
      (user) => {
        setWorkouts(user.data().workouts);
      }
    );
    return unsubscribe;
  }, []);

  const handleNewWorkout = () => {
    navigation.navigate("New Workout");
  };

  const handleSingleWorkout = (workout) => {
    navigation.navigate("Single Workout", { workout: workout });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView bg="colors.bg" height="100%" behavior="padding">
        <HStack justifyContent="space-between" marginTop="15%">
          <Pressable onPress={() => navigation.navigate("Home")}>
            <MaterialIcons name="home" size={50} color="#9067C6" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <MaterialIcons name="person" color="#9067C6" size={50} />
          </Pressable>
        </HStack>
        <Box alignSelf="center">
          <Text fontSize="5xl" color="colors.text" textAlign="center">
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
            Add Workout
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
              bg="colors.box"
              p="5"
              rounded="8"
              width="80%"
            >
              <Text
                alignSelf="center"
                color="white"
                fontWeight="medium"
                fontSize="4xl"
                numberOfLines={1}
                textTransform="uppercase"
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

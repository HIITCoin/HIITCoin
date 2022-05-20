import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Box,
  Button,
  Text,
  Pressable,
  HStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { ScrollView } from "react-native";
import { getWorkoutHistory } from "../misc/helperFunctions";

const WorkoutHistory = () => {
  const [workouts, setWorkouts] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const getWorkouts = async () => {
      const WorkoutListFromDb = await getWorkoutHistory();
      setWorkouts(WorkoutListFromDb);
    };
    getWorkouts();
  }, []);

  return (
    <ScrollView>
      <Box bg="colors.bg">
        <HStack justifyContent="space-between" marginTop="15%">
          <Pressable onPress={() => navigation.navigate("Home")}>
            <MaterialIcons name="home" size={50} color="#9067C6" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <MaterialIcons name="person" color="#9067C6" size={50} />
          </Pressable>
        </HStack>
        <Box marginTop="2%" alignSelf="center">
          <Text fontSize="4xl" color="colors.text">
            Workout History
          </Text>
        </Box>
        {workouts.map((workout, index) => (
          <Button
            key={index}
            alignSelf="center"
            marginTop="5%"
            shadow="3"
            bg="colors.box"
            p="5"
            rounded="xl"
            width="80%"
            onPress={() =>
              navigation.navigate("Single Workout", {
                workout: workout,
                fromHistory: true,
              })
            }
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
  );
};

export default WorkoutHistory;

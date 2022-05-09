import { StyleSheet, View, TouchableOpacity, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
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
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';
import { TouchableWithoutFeedback } from 'react-native';

const Workouts = () => {
  const workoutsArr = [
    {
      name: 'Leg Day :-)',
      rounds: 3,
      restBetweenRounds: 3,
      exercises: [
        {
          name: 'Squat',
          weight: 150,
          sets: 3,
          reps: 5,
          duration: 10,
          rest: 2,
        },
        {
          name: 'Leg Press',
          weight: 300,
          sets: 3,
          reps: 3,
          duration: 8,
          rest: 1,
        },
      ],
    },
    {
      name: 'Arm day :-)',
      rounds: 2,
      restBetweenRounds: 5,
      exercises: [
        {
          name: 'Bench Press',
          weight: 75,
          sets: 3,
          reps: 5,
          duration: 10,
          rest: 2,
        },
        {
          name: 'Dumbell Curve',
          weight: 15,
          sets: 3,
          reps: 3,
          duration: 8,
          rest: 1,
        },
      ],
    },
  ];

  const navigation = useNavigation();

  const handleNewWorkout = () => {
    navigation.navigate('New Workout');
  };

  const handleSingleWorkout = (workout) => {
    navigation.navigate('Single Workout', { workout: workout });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView bg="colors.bg" height="100%" behavior="padding">
        <Box marginTop="5%" alignSelf="center">
          <Text fontSize="6xl" color="colors.text">
            My Workouts
          </Text>
        </Box>
        <Button
          onPress={handleNewWorkout}
          alignSelf="center"
          marginTop="5%"
          alignSelf="center"
          shadow="3"
          bg="colors.text"
          p="5"
          rounded="8"
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
          {workoutsArr.map((workout) => (
            <Button
              onPress={handleSingleWorkout(workout)}
              alignSelf="center"
              marginTop="5%"
              alignSelf="center"
              shadow="3"
              bg="colors.text"
              p="5"
              rounded="8"
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Workouts;

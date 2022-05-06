import { StyleSheet, View, TouchableOpacity, Keyboard } from 'react-native'
import React, {useEffect, useState} from 'react'
import { KeyboardAvoidingView, Input, Box, Icon, Button, Center, flex, Text, keyboardDismissHandlerManager, Pressable, Badge, Spacer, Flex, HStack} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';
import { TouchableWithoutFeedback } from 'react-native';

const Workouts = () => {

  const navigation = useNavigation();

  const handleNewWorkout = () => {
    navigation.navigate("New Workout")
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView bg="colors.bg" height="100%"
      behavior="padding"
    >
      <Box marginTop="5%" alignSelf="center">
        <Text fontSize="6xl" color="colors.text">My Workouts</Text>
      </Box>
      <Button onPress={handleNewWorkout} alignSelf="center" marginTop="5%" alignSelf="center" shadow="3" bg="colors.text" p="5" rounded="8">
          <Text alignSelf="center" color="white" fontWeight="medium" fontSize="4xl">
            + New Workout
          </Text>
      </Button>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
};

export default Workouts;

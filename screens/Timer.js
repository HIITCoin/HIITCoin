import { Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Text, VStack, Box, HStack } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "../misc/helperFunctions";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Timer = () => {
  const navigation = useNavigation();

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
            0:59
          </Text>
        </Box>
        <HStack justifyContent="space-between">
          <Pressable onPress={() => console.log("Play/Pause Pressed")}>
            <FontAwesome name="play" size={130} color="green" />
            <FontAwesome name="pause" size={130} color="yellow" />
            <Text fontSize="3xl" color="colors.text" textAlign="center">
              Play/Pause
            </Text>
          </Pressable>
          <Pressable onPress={() => console.log("Stop Pressed")}>
            <FontAwesome name="stop" size={130} color="red" />
            <Text fontSize="3xl" color="colors.text" textAlign="center">
              Stop
            </Text>
          </Pressable>
        </HStack>
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default Timer;

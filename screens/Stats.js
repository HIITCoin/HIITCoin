import { Pressable, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Text, VStack, Box, HStack } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "../misc/helperFunctions";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
// import { Stopwatch } from "react-native-stopwatch-timer";

const Stats = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView bg="colors.bg" height="100%">
      <Box marginTop="20%" marginBottom="5%">
        <Text fontSize="5xl" color="colors.text" textAlign="center">
          Statistics
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
          <Text fontSize="7xl" color="colors.other" textAlign="center">
            Wazzup
          </Text>
        </Box>
        <HStack justifyContent="space-between">
          <Pressable>
            <FontAwesome name="play" size={130} color="green" />
          </Pressable>
          <Pressable>
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

export default Stats;

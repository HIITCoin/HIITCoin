import { Pressable, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Text,
  VStack,
  Flex,
  Box,
  HStack,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getDocs, collection, doc, query, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import {
  addNewWorkout,
  createOrSubmitHistory,
  editUser,
  getExercises,
  getSingleExercise,
  getSingleWorkout,
  getUser,
  getUserWorkouts,
} from "../misc/helperFunctions";

const HomeScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const exCollection = collection(db, "Exercises");

  useEffect(() => {
    const getExer = async () => {
      let arr = [];
      // console.log('getUserWorkouts', await getUserWorkouts());
      // console.log('getSingleWorkout', await getSingleWorkout("test2"))
      // console.log('deleteWorkout', await deleteWorkout("test1"))
      // console.log('addNewWorkout', await addNewWorkout({name: 'test3', exercises: [{name: 'Leg Press'}, {name: 'Dumbell Lunges'}], rounds: 1, restRounds: 60}))
      // console.log('getExercises', await getExercises());
      // console.log('getSingleExercise', await getSingleExercise("Chest Press"))
      const user = await getUser();
      const data = await getDocs(exCollection).then((snapshot) => {
        snapshot.docs.forEach((doc) => arr.push({ ...doc.data(), id: doc.id }));
      });
      console.log(
        auth.currentUser.uid,
        auth.currentUser.email,
        user.firstName,
        user.lastName,
        new Date(user.startDate.seconds * 1000) //correct date notation
      );
    };
    getExer();
  }, []);

  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await getUser();
      setFirstName(user.firstName);
    };
    getUserInfo();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Get out");
      navigation.navigate("Login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView bg="colors.bg" height="100%">
      <Box marginTop="20%" marginBottom="10%">
        <HStack justifyContent="space-between">
          <Pressable
            //implement navigation.navigate("where")
            onPress={() => console.log("Home pressed")}
          >
            <MaterialIcons name="home" size={50} color="#9067C6" />
          </Pressable>
          <Pressable
            //implement navigation.navigate("where")
            onPress={() => navigation.navigate("Profile")}
          >
            <MaterialIcons name="person" color="#9067C6" size={50} />
          </Pressable>
        </HStack>
        {/* Get userName from props/state/auth and implement here */}
        <Text fontSize="5xl" color="colors.text" textAlign="center">
          Hello, {firstName}
        </Text>
      </Box>
      <VStack space={4} alignItems="center" bg="colors.bg">
        <Box
          w="100%"
          h="10"
          bg="colors.bg"
          rounded="md"
          borderWidth="2px"
          borderColor="colors.text"
          shadow={3}
          justifyContent="center"
        >
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <Text fontSize="xl" color="colors.text" marginLeft="10px">
              Profile
            </Text>
          </Pressable>
        </Box>
        <Box
          w="100%"
          h="10"
          bg="colors.bg"
          rounded="md"
          borderWidth="2px"
          borderColor="colors.text"
          shadow={3}
          justifyContent="center"
        >
          <Pressable onPress={() => navigation.navigate("Stats")}>
            <Text fontSize="xl" color="colors.text" marginLeft="10px">
              Stats
            </Text>
          </Pressable>
        </Box>
        <Box
          w="100%"
          h="10"
          bg="colors.bg"
          rounded="md"
          borderWidth="2px"
          borderColor="colors.text"
          shadow={3}
          justifyContent="center"
        >
          <Pressable onPress={() => navigation.navigate("Workouts")}>
            <Text fontSize="xl" color="colors.text" marginLeft="10px">
              Workout!
            </Text>
          </Pressable>
        </Box>
        <Box
          w="100%"
          h="10"
          bg="colors.bg"
          rounded="md"
          borderWidth="2px"
          borderColor="colors.text"
          shadow={3}
          justifyContent="center"
        >
          <Pressable onPress={() => navigation.navigate("Timer")}>
            <Text fontSize="xl" color="colors.text" marginLeft="10px">
              Quick Timer
            </Text>
          </Pressable>
        </Box>
        <Box
          w="100%"
          h="10"
          bg="colors.bg"
          rounded="md"
          borderWidth="2px"
          borderColor="colors.text"
          shadow={3}
          //To align left, change <Box> to Center
          justifyContent="center"
        >
          <Pressable onPress={handleSignOut}>
            <Text fontSize="xl" color="colors.text" marginLeft="10px">
              Log Out
            </Text>
          </Pressable>
        </Box>
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

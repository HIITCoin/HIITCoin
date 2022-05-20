import { Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, Text, VStack, Box, HStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import { getUser } from "../misc/helperFunctions";

const HomeScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
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
      navigation.navigate("Login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView bg="colors.bg" height="100%">
      <Box marginTop="10%" marginBottom="10%">
        <HStack justifyContent="space-between">
          <Pressable onPress={() => console.log("Home pressed")}>
            <MaterialIcons name="home" size={50} color="#9067C6" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <MaterialIcons name="person" color="#9067C6" size={50} />
          </Pressable>
        </HStack>
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
          <Pressable onPress={() => console.log("Stats pressed")}>
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
          <Pressable onPress={() => navigation.navigate("WorkoutHistory")}>
            <Text fontSize="xl" color="colors.text" marginLeft="10px">
              Workout History
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
              Workout
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

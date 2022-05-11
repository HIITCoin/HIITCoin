import { Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Text, VStack, Box, HStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "../misc/helperFunctions";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const PersonalInfoScreen = () => {
  const navigation = useNavigation();

  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [startDate, setStartDate] = useState({});
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     const user = await getUser();
  //     setHeight(user.height);
  //     setWeight(user.weight);
  //     setAge(user.age);
  //     setStartDate(new Date(user.startDate.seconds * 1000));
  //   };
  //   getUserInfo();
  // }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "Users", auth.currentUser.uid),
      (user) => {
        let userDb = user.data();
        userDb.startDate = new Date(userDb.startDate.seconds * 1000);
        setUser(userDb);
        console.log(user);
      }
    );
    return unsubscribe;
  }, []);

  return (
    <KeyboardAvoidingView bg="colors.bg" height="100%">
      <Box marginTop="20%" marginBottom="10%">
        <HStack justifyContent="space-between">
          <Pressable
            //implement navigation.navigate("where")
            onPress={() => navigation.navigate("Home")}
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
        <Text fontSize="6xl" color="colors.text">
          Personal Info
        </Text>
      </Box>
      <VStack space={4} alignItems="center" bg="colors.bg">
        <Box
          //To align center, change <Box> to Center
          w="100%"
          h="10"
          bg="colors.bg"
          rounded="md"
          borderWidth="2px"
          borderColor="colors.text"
          shadow={3}
          justifyContent="center"
        >
          <Pressable onPress={() => console.log("Height pressed")}>
            <Text fontSize="xl" color="colors.text" marginLeft="10px">
              Height: {user.height || 0}
            </Text>
          </Pressable>
        </Box>
        <Box
          //To align left, change <Box> to Center
          w="100%"
          h="10"
          bg="colors.bg"
          rounded="md"
          borderWidth="2px"
          borderColor="colors.text"
          shadow={3}
          justifyContent="center"
        >
          <Pressable onPress={() => console.log("Weight pressed")}>
            <Text fontSize="xl" color="colors.text" marginLeft="10px">
              Weight: {user.weight}
            </Text>
          </Pressable>
        </Box>
        <Box
          //To align left, change <Box> to Center
          w="100%"
          h="10"
          bg="colors.bg"
          rounded="md"
          borderWidth="2px"
          borderColor="colors.text"
          shadow={3}
          justifyContent="center"
        >
          <Pressable onPress={() => console.log("Age pressed")}>
            <Text fontSize="xl" color="colors.text" marginLeft="10px">
              Age: {user.age}
            </Text>
          </Pressable>
        </Box>
        <Box
          //To align left, change <Box> to Center
          w="100%"
          h="10"
          bg="colors.bg"
          rounded="md"
          borderWidth="2px"
          borderColor="colors.text"
          shadow={3}
          justifyContent="center"
        >
          <Pressable onPress={() => console.log("Account Made pressed")}>
            <Text fontSize="xl" color="colors.text" marginLeft="10px">
              Account Made: {JSON.stringify(user.startDate)}
            </Text>
          </Pressable>
        </Box>
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default PersonalInfoScreen;

const styles = StyleSheet.create({});

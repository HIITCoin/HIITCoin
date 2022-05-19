import { Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Text, VStack, Box, HStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "../misc/helperFunctions";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await getUser();
      setFirstName(user.firstName);
    };
    getUserInfo();
  }, []);

  return (
    <KeyboardAvoidingView bg="colors.bg" height="100%">
      <Box marginTop="20%" marginBottom="10%">
        <HStack justifyContent="space-between">
          <Pressable onPress={() => navigation.navigate("Home")}>
            <MaterialIcons name="home" size={50} color="#9067C6" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <MaterialIcons name="person" color="#9067C6" size={50} />
          </Pressable>
        </HStack>
        <Text fontSize="5xl" color="colors.text" textAlign="center">
          {firstName}'s Profile
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
          <Pressable onPress={() => navigation.navigate("Personal Info")}>
            <Text fontSize="xl" color="colors.text" marginLeft="10px">
              Personal Info
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
          <Pressable onPress={() => navigation.navigate("Edit Profile")}>
            <Text fontSize="xl" color="colors.text" marginLeft="10px">
              Edit Profile
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
          <Pressable onPress={() => navigation.navigate("Settings")}>
            <Text fontSize="xl" color="colors.text" marginLeft="10px">
              Settings
            </Text>
          </Pressable>
        </Box>
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

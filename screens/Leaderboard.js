import { Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Text, VStack, Box, HStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAllUsers } from "../misc/helperFunctions";

const Leaderboard = () => {
  const navigation = useNavigation();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const AllUsers = async () => {
      const users = await getAllUsers();
      setAllUsers(users);
    };
    AllUsers();
  }, []);
  console.log(allUsers);

  return (
    <KeyboardAvoidingView bg="colors.bg" height="100%">
      <Box marginTop="10%" marginBottom="10%">
        <HStack justifyContent="space-between">
          <Pressable onPress={() => navigation.navigate("Home")}>
            <MaterialIcons name="home" size={50} color="#9067C6" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <MaterialIcons name="person" color="#9067C6" size={50} />
          </Pressable>
        </HStack>
        <Text fontSize="5xl" color="colors.text" textAlign="center">
          Leaderboard
        </Text>
      </Box>
      <VStack space={allUsers.length} alignItems="center" bg="colors.bg">
        {allUsers.map((user) => {
            return (
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
            <Text fontSize="xl" color="colors.text" marginLeft="10px">
            {user.firstName || ""} {user.points || 0}
            </Text>
        </Box>
            )
        })}
        
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({});

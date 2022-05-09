import { Pressable, StyleSheet } from "react-native"
import React, {useState, useEffect} from "react"
import { KeyboardAvoidingView, Text, VStack, Flex, Box, HStack } from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { getDocs,collection } from "firebase/firestore"
import { db } from "../firebase"
import { getAuth, signOut } from "firebase/auth";

const HomeScreen = () => {
	const navigation = useNavigation()
  const auth = getAuth()
  const exCollection = collection(db, 'Exercises')

  useEffect(() => {
    const getExer = async () => {
      let arr =[]
      const data = await getDocs(exCollection).then(snapshot => {
        snapshot.docs.forEach(doc => arr.push({...doc.data(), id: doc.id}))
      })
      console.log(arr)
    }
    getExer()
  }, [])

  const handleSignOut = async() => {
    try {
      await signOut(auth);
      console.log("Get out");
      navigation.navigate("Login")
    } catch (error) {
      alert(error.message);
    }
  };
	return (
		<KeyboardAvoidingView bg="colors.bg" height="100%">
			<Box marginTop="20%" marginBottom="10%" >
				<HStack justifyContent="space-between">
					<Pressable
						//implement navigation.navigate("where")
						onPress={() => console.log("Home pressed")}
					>
						<MaterialIcons
							name="home"
							size={50}
							color="#9067C6"
						/>
					</Pressable>
					<Pressable
						//implement navigation.navigate("where")
						onPress={() => navigation.navigate("Profile")}
					>
						<MaterialIcons
							name="person"
							color="#9067C6"
							size={50}
						/>
					</Pressable>
				</HStack>
				{/* Get userName from props/state/auth and implement here */}
				<Text fontSize="6xl" color="colors.text">
					Hello, User
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
					<Pressable onPress={() => console.log("Profile pressed")}>
						<Text
							fontSize="xl"
							color="colors.text"
							marginLeft="10px"
						>
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
						<Text
							fontSize="xl"
							color="colors.text"
							marginLeft="10px"
						>
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
					<Pressable onPress={() => console.log("Workouts pressed")}>
						<Text
							fontSize="xl"
							color="colors.text"
							marginLeft="10px"
						>
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
					<Pressable
						onPress={() => console.log("Quick Timer pressed")}
					>
						<Text
							fontSize="xl"
							color="colors.text"
							marginLeft="10px"
						>
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
					<Pressable
						onPress={handleSignOut}
					>
						<Text
							fontSize="xl"
							color="colors.text"
							marginLeft="10px"
						>
							Log Out
						</Text>
					</Pressable>
				</Box>
			</VStack>
		</KeyboardAvoidingView>
	)
}

export default HomeScreen

const styles = StyleSheet.create({})

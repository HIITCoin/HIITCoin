import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { KeyboardAvoidingView, Text, VStack, Box, HStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
	const navigation = useNavigation()
	return (
		<KeyboardAvoidingView bg="colors.bg" height="100%">
			<Box marginTop="20%" marginBottom="10%" >
				<HStack justifyContent="space-between">
					<Pressable
						//implement navigation.navigate("where")
						onPress={() => navigation.navigate("Home")}
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
					User Name
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
					<Pressable onPress={() => navigation.navigate("Personal Info")}>
						<Text
							fontSize="xl"
							color="colors.text"
							marginLeft="10px"
						>
							Personal Info
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
					<Pressable onPress={() => console.log("Edit Profile pressed")}>
						<Text
							fontSize="xl"
							color="colors.text"
							marginLeft="10px"
						>
							Edit Profile
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
					<Pressable
						onPress={() => console.log("Quick Timer pressed")}
					>
						<Text
							fontSize="xl"
							color="colors.text"
							marginLeft="10px"
						>
							Badges
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
					<Pressable
						onPress={() => navigation.navigate("Settings")}
					>
						<Text
							fontSize="xl"
							color="colors.text"
							marginLeft="10px"
						>
							Settings
						</Text>
					</Pressable>
				</Box>
			</VStack>
		</KeyboardAvoidingView>
	)
}

export default ProfileScreen

const styles = StyleSheet.create({});

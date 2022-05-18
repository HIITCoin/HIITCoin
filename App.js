import React from "react";
import {
  NativeBaseProvider,
  Box,
  Text,
  extendTheme,
  StatusBar,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import Workouts from "./screens/Workouts";
import NewWorkout from "./screens/NewWorkout";
import SingleWorkout from "./screens/SingleWorkout";
import PersonalInfoScreen from "./screens/PersonalInfoScreen";
import SignupScreen from "./screens/SignupScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import CreateEditExercise from "./screens/CreateEditExercise";
import SearchBarComp from "./helperComponents/SearchBarComp";
import Timer from "./screens/Timer";
import Stats from "./screens/Stats";
import { colorTheme } from "./misc/colorTheme";

const Stack = createNativeStackNavigator();

const colors = extendTheme({ colors: colorTheme });

export default function App() {
  return (
    <NativeBaseProvider theme={colors}>
      {/* <StatusBar hidden /> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Workouts"
            component={Workouts}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="New Workout"
            component={NewWorkout}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Single Workout"
            component={SingleWorkout}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Signup"
            component={SignupScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Profile"
            component={ProfileScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Settings"
            component={SettingsScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Personal Info"
            component={PersonalInfoScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Edit Profile"
            component={EditProfileScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="CreateEditExercise"
            component={CreateEditExercise}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SearchBarComp"
            component={SearchBarComp} 
           />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Timer"
            component={Timer}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Stats"
            component={Stats}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

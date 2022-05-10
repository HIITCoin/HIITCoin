import React from 'react';
import {
  NativeBaseProvider,
  Box,
  Text,
  extendTheme,
  StatusBar,
} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Workouts from './screens/Workouts';
import NewWorkout from './screens/NewWorkout';
import SingleWorkout from './screens/SingleWorkout';
import PersonalInfoScreen from "./screens/PersonalInfoScreen"
import SignupScreen from "./screens/SignupScreen"
import ProfileScreen from "./screens/ProfileScreen"
import SettingsScreen from "./screens/SettingsScreen"
import { colorTheme } from './misc/colorTheme';

const Stack = createNativeStackNavigator()

const colors = extendTheme({ colors: colorTheme })

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
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Workouts" component={Workouts} />
          <Stack.Screen name="New Workout" component={NewWorkout} />
          <Stack.Screen name="Single Workout" component={SingleWorkout} />
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
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

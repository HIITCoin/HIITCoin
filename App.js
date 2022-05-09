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
import { colorTheme } from './misc/colorTheme';

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
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Workouts" component={Workouts} />
          <Stack.Screen name="New Workout" component={NewWorkout} />
          <Stack.Screen name="Single Workout" component={SingleWorkout} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

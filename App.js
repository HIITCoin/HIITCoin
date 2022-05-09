import React from "react"
import { NativeBaseProvider, extendTheme, StatusBar } from "native-base"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "./screens/LoginScreen"
import HomeScreen from "./screens/HomeScreen"
import SignupScreen from "./screens/SignupScreen"
import ProfileScreen from "./screens/ProfileScreen"
import SettingsScreen from "./screens/SettingsScreen"
import PersonalInfoScreen from "./screens/PersonalInfoScreen"
import { colorTheme } from "./misc/colorTheme"

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
					<Stack.Screen
						options={{ headerShown: false }}
						name="Home"
						component={HomeScreen}
					/>
					<Stack.Screen
						options={{ headerShown: false }}
						name="Signup"
						component={SignupScreen}
          />
          <Stack.Screen
            options={{ headerShown: true }}
						name="Profile"
						component={ProfileScreen}
					/>
          <Stack.Screen
            options={{ headerShown: true }}
						name="Settings"
						component={SettingsScreen}
					/>
          <Stack.Screen
            options={{ headerShown: true }}
						name="Personal Info"
						component={PersonalInfoScreen}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</NativeBaseProvider>
	)
}

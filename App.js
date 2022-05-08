import React from "react"
import { NativeBaseProvider, extendTheme, StatusBar } from "native-base"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "./screens/LoginScreen"
import HomeScreen from "./screens/HomeScreen"
import SignupScreen from "./screens/SignupScreen"
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
				</Stack.Navigator>
			</NavigationContainer>
		</NativeBaseProvider>
	)
}

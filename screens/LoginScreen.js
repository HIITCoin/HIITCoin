import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { KeyboardAvoidingView, Input, Box, Icon, Button, Center, flex, Text} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate("Home")
      }
    })
    return unsubscribe;
  }, [])

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log("New user", user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleSignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log("Welcome back", user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    <KeyboardAvoidingView bg="colors.bg" height="100%"
      behavior="padding" //when keyboard slides up it won't cover the input field and users will see what they type
    >
      <Box marginTop="30%" alignSelf="center">
        <Text fontSize="6xl" color="colors.text">HiiTCoin</Text>
      </Box>
      <Box alignSelf="center">
        <Input mx="3" placeholder="Email" w="75%" maxWidth="300px"
          variant="rounded" margin="2" marginTop="30%" color="colors.other"
          InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input mx="3" placeholder="Password" w="75%" maxWidth="300px"
          secureTextEntry
          variant="rounded" margin="2" color="colors.other"
          InputLeftElement={<Icon as={<MaterialIcons name="vpn-key" />} size={5} ml="2" color="muted.400" />}
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </Box>
      <Box marginHorizontal={50} display={flex} flexDirection="row">
        <Button width="60%" flex={1} margin={5}
          onPress={handleSignIn}
        >
          Sign In
        </Button>
        <Button width="60%" flex={1} margin={5}
          onPress={handleSignUp}
        >
          Sign Up
        </Button>
    </Box>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen


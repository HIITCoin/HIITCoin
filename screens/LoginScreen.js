import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { KeyboardAvoidingView, Input, Box, Icon, Button, Center, flex, Text} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
          onPress={() => console.log("Signing In")}
        >
          Sign In
        </Button>
        <Button width="60%" flex={1} margin={5}
          onPress={() => console.log("Signing Up")}
        >
          Sign Up
        </Button>
    </Box>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen


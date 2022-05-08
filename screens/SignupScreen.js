import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Input,
  Box,
  Icon,
  Button,
  Center,
  flex,
  Text,
  keyboardDismissHandlerManager,
  FormControl
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "../firebase";
import { useNavigation } from "@react-navigation/core";

const SignupScreen = () => {
  //make sure numbers remain numbers and not strings
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");

  const navigation = useNavigation();
  const behavior = Platform.OS === "ios" ? "position" : "padding";
  const offsetKeyBoard = Platform.OS === "ios" ? 5 : 0;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);
  const validate = () => {

  }
  const handleSignUp = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (user) {
        const dbUserInstance = {
          firstName,
          lastName,
          height: Number(height),
          weight: Number(weight),
          age: Number(weight),
        };
        console.log("New user", user.email);
        navigation.navigate("Home");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        bg="colors.bg"
        height="100%"
        behavior={behavior}
        keyboardVerticalOffset={offsetKeyBoard} //when keyboard slides up it won't cover the input field and users will see what they type
      >
        <Box marginTop="20%" alignSelf="center">
          <Text fontSize="3xl" color="colors.text">
            Signup
          </Text>
        </Box>
        <Box alignSelf="center">
        <FormControl isRequired marginTop="30%">
        <FormControl.Label marginBottom="0%" _text={{
          bold: true,
          ml: 5,
        }}>Email</FormControl.Label>
          <Input
            mx="3"
            placeholder="Email"
            w="75%"
            maxWidth="300px"
            variant="rounded"
            margin="2"
            color="colors.other"
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="person" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          </FormControl>
          <FormControl isRequired>
          <FormControl.Label marginBottom="0%" _text={{
            bold: true,
            ml: 5,
          }}>Password</FormControl.Label>
          <Input
            mx="3"
            placeholder="Password"
            w="75%"
            maxWidth="300px"
            secureTextEntry
            variant="rounded"
            margin="2"
            color="colors.other"
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="vpn-key" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          </FormControl>

          {/*firstName*/}
          <Input
            mx="3"
            placeholder="First Name"
            w="75%"
            maxWidth="300px"
            secureTextEntry
            variant="rounded"
            margin="2"
            color="colors.other"
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="vpn-key" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          <Input
            mx="3"
            placeholder="Last Name"
            w="75%"
            maxWidth="300px"
            secureTextEntry
            variant="rounded"
            margin="2"
            color="colors.other"
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="vpn-key" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
          <Input
            mx="3"
            placeholder="Height(in inches)"
            w="75%"
            maxWidth="300px"
            secureTextEntry
            variant="rounded"
            margin="2"
            color="colors.other"
            keyboardType="numeric"
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="vpn-key" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            value={String(height)}
            onChangeText={(text) => setHeight(String(text))}
          />
          <Input
            mx="3"
            placeholder="Weight(lbs)"
            w="75%"
            maxWidth="300px"
            secureTextEntry
            variant="rounded"
            margin="2"
            color="colors.other"
            keyboardType="numeric"
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="vpn-key" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            value={String(weight)}
            onChangeText={(text) => setWeight(String(text))}
          />
          <Input
            mx="3"
            placeholder="Age(years)"
            w="75%"
            maxWidth="300px"
            secureTextEntry
            variant="rounded"
            margin="2"
            color="colors.other"
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="vpn-key" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            value={String(age)}
            onChangeText={(text) => setAge(String(text))}
          />
        </Box>
        <Box marginHorizontal={50} display={"flex"} flexDirection="row">
          <Button width="60%" flex={1} margin={5} onPress={handleSignUp}>
            Sign Up
          </Button>
        </Box>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

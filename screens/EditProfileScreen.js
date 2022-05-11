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
  FormControl,
  ScrollView,
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons";
import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "../firebase";
import { getUser } from "../misc/helperFunctions";
import { useNavigation } from "@react-navigation/core";

const EditProfileScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  // const [startDate, setStartDate] = useState([])

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await getUser();
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setHeight(user.height);
      setWeight(user.weight);
      setAge(user.age);
      // setStartDate(user.startDate);
    };
    getUserInfo();
  }, []);

  const navigation = useNavigation();
  const behavior = Platform.OS === "ios" ? "position" : "padding";
  const offsetKeyBoard = Platform.OS === "ios" ? 5 : 0;

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       navigation.navigate("Home");
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  // useEffect(() => {
  //   let reset = () => {
  //     setEmail('')
  //     setAge('')
  //     setFirstName('')
  //     setHeight('')
  //     setWeight('')
  //     setLastName('')
  //     setPassword('')
  //   }
  //   return reset
  // }, [])
  const validate = (data) => {
    // data will be user object made from all data in state
    //required
    for (let field in data) {
      if (!String(data[field]).length) {
        alert("Please fill out all the fields, we talked about this already");
        return false;
      }
    }
    return true;
  };

  // const handleEdit = async () => {
  //   try {
  //     let dbUserInstance = {
  //       firstName,
  //       lastName,
  //       height: Number(height),
  //       weight: Number(weight),
  //       age: Number(age),
  //     };
  //     console.log(dbUserInstance)
  //    if (validate(dbUserInstance)) {
  //     // const { user } = await createUserWithEmailAndPassword(
  //     //   auth,
  //     //   email,
  //     //   password
  //     // );
  //     if (user) {
  //       console.log("New user", user.email);
  //       dbUserInstance.id = user.uid
  //       await makeUser(dbUserInstance)
  //       navigation.navigate("Home");
  //     }
  //   }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  return (
    <KeyboardAwareScrollView
      style={{ height: "150%", backgroundColor: "#1B1B3A" }}
    >
      <TouchableWithoutFeedback
        bg="colors.bg"
        height="150%"
        onPress={Keyboard.dismiss}
      >
        <KeyboardAvoidingView
          bg="colors.bg"
          height="150%"
          // behavior={behavior}
          keyboardVerticalOffset={offsetKeyBoard} //when keyboard slides up it won't cover the input field and users will see what they type
        >
          <Box marginTop="20%" alignSelf="center">
            <Text fontSize="3xl" color="colors.text">
              Edit Profile
            </Text>
          </Box>
          <Box alignSelf="center">
            {/* <FormControl isRequired marginTop="0%">
              <FormControl.Label
                marginBottom="0%"
                _text={{
                  bold: true,
                  ml: 5,
                  color: 'colors.text'
                }}
              >
                Email
              </FormControl.Label>
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
                // value={email}
                // onChangeText={(text) => setEmail(text)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label
                marginBottom="0%"
                _text={{
                  bold: true,
                  ml: 5,
                  color: 'colors.text'
                }}
              >
                Password
              </FormControl.Label>
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
                // value={password}
                // onChangeText={(text) => setPassword(text)}
              />
            </FormControl> */}

            {/*firstName*/}
            <FormControl isRequired>
              <FormControl.Label
                marginBottom="0%"
                _text={{
                  bold: true,
                  ml: 5,
                  color: "colors.text",
                }}
              >
                First Name
              </FormControl.Label>
              <Input
                mx="3"
                placeholder={firstName}
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
                // value={firstName}
                // onChangeText={(text) => setFirstName(text)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label
                marginBottom="0%"
                _text={{
                  bold: true,
                  ml: 5,
                  color: "colors.text",
                }}
              >
                Last Name
              </FormControl.Label>
              <Input
                mx="3"
                placeholder={lastName}
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
                // value={lastName}
                // onChangeText={(text) => setLastName(text)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label
                marginBottom="0%"
                _text={{
                  bold: true,
                  ml: 5,
                  color: "colors.text",
                }}
              >
                Height
              </FormControl.Label>
              <Input
                mx="3"
                placeholder={height.toString()}
                w="75%"
                maxWidth="300px"
                variant="rounded"
                margin="2"
                color="colors.other"
                keyboardType="numeric"
                // value={String(height)}
                // onChangeText={(text) => setHeight(String(text))}
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label
                marginBottom="0%"
                _text={{
                  bold: true,
                  ml: 5,
                  color: "colors.text",
                }}
              >
                Weight
              </FormControl.Label>
              <Input
                mx="3"
                placeholder={weight.toString()}
                w="75%"
                maxWidth="300px"
                variant="rounded"
                margin="2"
                color="colors.other"
                keyboardType="numeric"
                // value={String(weight)}
                // onChangeText={(text) => setWeight(String(text))}
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label
                marginBottom="0%"
                _text={{
                  bold: true,
                  ml: 5,
                  color: "colors.text",
                }}
              >
                Age
              </FormControl.Label>
              <Input
                mx="3"
                placeholder={age.toString()}
                w="75%"
                maxWidth="300px"
                variant="rounded"
                margin="2"
                color="colors.other"
                // value={String(age)}
                // onChangeText={(text) => setAge(String(text))}
              />
            </FormControl>
          </Box>
          <Box marginHorizontal={50} display={"flex"} flexDirection="row">
            {/* onPress={handleSignUp} */}
            <Button width="60%" flex={1} margin={5}>
              Edit
            </Button>
          </Box>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default EditProfileScreen;

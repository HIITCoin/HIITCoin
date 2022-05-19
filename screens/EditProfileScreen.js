import {
  View,
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
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons";
import { getUser, editUser } from "../misc/helperFunctions";
import { useNavigation } from "@react-navigation/core";

const EditProfileScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await getUser();
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setHeight(user.height);
      setWeight(user.weight);
      setAge(user.age);
    };
    getUserInfo();
  }, []);
  const offsetKeyBoard = Platform.OS === "ios" ? 5 : 0;

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

  const handleEdit = async () => {
    try {
      await editUser({
        firstName: firstName,
        lastName: lastName,
        height: height,
        weight: weight,
        age: age,
      });
      setEditStatus("Success!");
    } catch (error) {
      console.error(error.message);
    }
  };

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
          keyboardVerticalOffset={offsetKeyBoard}
        >
          <Box marginTop="20%" alignSelf="center">
            <Text fontSize="5xl" color="colors.text">
              Edit Profile
            </Text>
            <Text color="colors.green" textAlign="center">
              {editStatus === "Success!"
                ? editStatus
                : console.log("No bueno, onii-chan")}
            </Text>
          </Box>
          <Box alignSelf="center">
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
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
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
                value={lastName}
                onChangeText={(text) => setLastName(text)}
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
                value={String(height)}
                onChangeText={(text) => setHeight(String(text))}
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
                value={String(weight)}
                onChangeText={(text) => setWeight(String(text))}
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
                value={String(age)}
                onChangeText={(text) => setAge(String(text))}
              />
            </FormControl>
          </Box>
          <Box marginHorizontal={50} display={"flex"} flexDirection="row">
            <Button width="60%" flex={1} margin={5} onPress={handleEdit}>
              Edit
            </Button>
          </Box>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default EditProfileScreen;

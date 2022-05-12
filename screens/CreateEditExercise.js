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
import { getUser, getExercises } from "../misc/helperFunctions";
import { useNavigation } from "@react-navigation/core";

function CreateEditExercise(props) {
  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [duration, setDuration] = useState("");
  const [rest, setRest] = useState("");

  useEffect(() => {
    async function exerciseGetFunc() {
      const list = await getExercises();
      let listNames = list.map((exercise) => exercise.name);
      setExerciseList(listNames);
    }
    function reset() {
      setExerciseName("");
      setDuration("");
      setSets("");
      setRest("");
      setReps("");
    }
    exerciseGetFunc();
    return reset;
  }, []);

  return (
    <TouchableWithoutFeedback
      bg="colors.bg"
      height="150%"
      onPress={Keyboard.dismiss}
    >
      <KeyboardAwareScrollView
        style={{ height: "150%", backgroundColor: "#1B1B3A" }}
      >
        <Box marginTop="20%" alignSelf="center">
          <Text fontSize="3xl" color="colors.text">
            Create/Edit Exercise
          </Text>
        </Box>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

<FormControl isRequired>
  <FormControl.Label
    marginBottom="0%"
    _text={{
      bold: true,
      ml: 5,
      color: "colors.text",
    }}
  >
    Password
  </FormControl.Label>
  <Input
    mx="3"
    placeholder="Password"
    w="75%"
    maxWidth="300px"
    variant="rounded"
    margin="2"
    color="colors.other"
    value={password}
    onChangeText={(text) => setPassword(text)}
  />
</FormControl>;

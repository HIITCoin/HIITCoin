import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import List from "./List";
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
  VStack,
  Heading,
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons";
import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "../firebase";
import {
  getUser,
  getExercises,
  secondToMinutesAndSeconds,
} from "../misc/helperFunctions";
import { useNavigation } from "@react-navigation/core";

export default function CreateEditExercise({ route }) {
  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [duration, setDuration] = useState({ minutes: "", seconds: "" });
  const [rest, setRest] = useState({ minutes: "", seconds: "" });
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const getExer = async () => {
      const exerciseListFromDb = await getExercises();
      setExerciseList(exerciseListFromDb);
    };
    let workout = route.params.state;
    console.log(workout);
    if (route.params.index) {
      //find exercise with flag on it
      const exDuration = secondToMinutesAndSeconds(exercise.duration);
      let exercise = workout.exercises[route.params.index];
      setExerciseName(exercise.name);
      setReps(exercise.reps);
      setSets(exercise.sets);
      setRest(exercise.rest);
      setDuration(exDuration);
      console.log({
        exerciseName,
        reps,
        duration,
        rest,
        sets,
      });
    }
    function reset() {
      setExerciseName("");
      setDuration({ minutes: "", seconds: "" });
      setSets("");
      setRest({ minutes: "", seconds: "" });
      setReps("");
    }
    getExer();
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
          <FormControl>
            <SafeAreaView>
              {!clicked && <Text>Exercise</Text>}

              <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setClicked={setClicked}
              />
              {!exerciseList ? (
                <ActivityIndicator size="large" />
              ) : (
                <List
                  searchPhrase={searchPhrase}
                  setSearchPhrase={setSearchPhrase}
                  data={exerciseList}
                  setClicked={setClicked}
                />
              )}
            </SafeAreaView>
          </FormControl>
        </Box>

        <FormControl isRequired></FormControl>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

// <FormControl isRequired>
//   <FormControl.Label
//     marginBottom="0%"
//     _text={{
//       bold: true,
//       ml: 5,
//       color: "colors.text",
//     }}
//   >
//     Password
//   </FormControl.Label>
//   <Input
//     mx="3"
//     placeholder="Password"
//     w="75%"
//     maxWidth="300px"
//     variant="rounded"
//     margin="2"
//     color="colors.other"
//     value={sets}
//     onChangeText={(text) => setSets(text)}
//   />
// </FormControl>;

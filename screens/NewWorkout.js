import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  useWindowDimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
  Pressable,
  Badge,
  Spacer,
  Flex,
  HStack,
  FormControl,
  Select,
  CheckIcon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { TouchableWithoutFeedback } from "react-native";
import {
  exerciseInWorkout,
  exerciseInWorkout2,
  sampleWorkoutInList,
} from "../misc/sampleData";

const NewWorkout = ({ route }) => {
  let [rounds, setRounds] = React.useState(0);
  let [name, setName] = React.useState("");
  let [roundRest, setRoundRest] = React.useState({ minutes: "", seconds: "" });
  let [exercises, setExercises] = React.useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    let state = sampleWorkoutInList; //change to route.params.state

    console.log(state);

    if (!isNaN(state.roundRest)) {
      state.roundRest = secondToMinutesAndSeconds(state.roundRest);
    }

    console.log(state.roundRest);

    setRounds(state.rounds);
    setName(state.name);
    setRoundRest(state.roundRest);
    setExercises(state.exercises);
  }, []);

  const secondToMinutesAndSeconds = (secs) => {
    console.log(secs);

    let seconds = secs % 60;

    let minutes = Math.floor(secs / 60);

    return { minutes: minutes.toString(), seconds: seconds.toString() };
  };

  let optionsArr = [];

  for (let i = 1; i <= 100; ++i) {
    optionsArr.push(i);
  }

  const handleNewExercise = () => {
    const state = {
      rounds,
      name,
      roundRest,
      exercises,
    };
    // navigation.navigate("CreateEditExercise", { state: state });
  };

  console.log(roundRest);

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
        >
          <Box marginTop="20%" alignSelf="center">
            <Text fontSize="3xl" color="colors.text">
              Create Workout
            </Text>
          </Box>
          <Box alignSelf="center">
            <FormControl marginTop="0%">
              <FormControl.Label
                marginBottom="0%"
                _text={{
                  bold: true,
                  ml: 5,
                  color: "colors.text",
                }}
              >
                Name
              </FormControl.Label>
              <Input
                mx="3"
                placeholder="Name"
                w="75%"
                maxWidth="300px"
                variant="rounded"
                margin="2"
                color="colors.other"
                value={name}
                onChangeText={(name) => setName(name)}
              />
            </FormControl>
            <Center alignContent="center">
              <Box w="3/4" maxWidth="300px" width="100%">
                <FormControl.Label
                  marginBottom="0%"
                  _text={{
                    bold: true,
                    ml: 2,
                    color: "colors.text",
                  }}
                >
                  Rounds
                </FormControl.Label>
                <Select
                  selectedValue={rounds}
                  minWidth="200"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(num) => setRounds(num)}
                >
                  {optionsArr.map((num) => (
                    <Select.Item key={num} label={num} value={num} />
                  ))}
                </Select>
              </Box>
            </Center>
            <Text bold="true" color="colors.text" ml="25%" marginTop={4}>
              Rest Between Rounds
            </Text>
            <HStack width="40%" space={2} marginTop="3">
              <FormControl>
                <Input
                  mx="1"
                  placeholder="Minutes"
                  w="100%"
                  variant="rounded"
                  margin="2"
                  color="colors.other"
                  value={Number(roundRest.minutes)}
                  keyboardType="numeric"
                  onChangeText={(mins) => {
                    setRoundRest({
                      minutes: String(mins),
                      seconds: roundRest.seconds,
                    });
                  }}
                />
              </FormControl>
              <FormControl>
                <Input
                  mx="1"
                  placeholder="Seconds"
                  w="100%"
                  variant="rounded"
                  margin="2"
                  color="colors.other"
                  value={Number(roundRest.seconds)}
                  keyboardType="numeric"
                  onChangeText={(secs) => {
                    setRoundRest({
                      minutes: roundRest.minutes,
                      seconds: String(secs),
                    });
                  }}
                />
              </FormControl>
            </HStack>
          </Box>
          <Box alignItems="center">
            {exercises.map((exercise) => (
              <Button
                key={exercise.name}
                onPress={handleNewExercise}
                w="80%"
                h="20"
                bg="colors.bg"
                rounded="md"
                borderWidth="2px"
                borderColor="colors.text"
                shadow={3}
                alignContent="center"
                marginTop="4"
              >
                <Text fontSize="18" color="colors.text" lineHeight="20">
                  <Text fontWeight="bold">{exercise.name}</Text> S:
                  {exercise.sets} R:
                  {exercise.reps} {"\n"} D:
                  {exercise.duration} Rest:
                  {exercise.rest}
                </Text>
              </Button>
            ))}
          </Box>
          <Box marginHorizontal={50} display={"flex"} flexDirection="row">
            <Button width="60%" flex={1} margin={5} onPress={console.log()}>
              Add Exercise
            </Button>
          </Box>
          <Box marginHorizontal={50} display={"flex"} flexDirection="row">
            <Button width="60%" flex={1} margin={5}>
              Create Workout
            </Button>
          </Box>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default NewWorkout;

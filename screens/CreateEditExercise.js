import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Input,
  Box,
  Icon,
  Button,
  Center,
  Text,
  keyboardDismissHandlerManager,
  FormControl,
  VStack,
  Heading,
  Select,
  CheckIcon,
  HStack,
  Divider,
  flex,
} from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons";
import {
  getExercises,
  secondToMinutesAndSeconds,
  getSingleExercise,
} from "../misc/helperFunctions";
import { useNavigation } from "@react-navigation/core";

export default function CreateEditExercise({ route }) {
  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [duration, setDuration] = useState({ minutes: "", seconds: "" });
  const [rest, setRest] = useState({ minutes: "", seconds: "" });
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    if (route.params.propsFromSearch) {
      setExerciseName(route.params.propsFromSearch.name);
    }
  }, [route.params.propsFromSearch]);

  let optionsArr = [];
  for (let i = 1; i <= 30; i++) {
    optionsArr.push(i);
  }
  useEffect(() => {
    const getExer = async () => {
      const exerciseListFromDb = await getExercises();
      setExerciseList(exerciseListFromDb);
    };
    let workout = route.params.state;
    if (route.params.index >= 0) {
      let exercise = workout.exercises[route.params.index];
      if (!isNaN(exercise.duration)) {
        const exDuration = secondToMinutesAndSeconds(exercise.duration);
        const exRest = secondToMinutesAndSeconds(exercise.rest);
        setRest(exRest);
        setDuration(exDuration);
      }
      setExerciseName(exercise.name);
      setReps(String(exercise.reps));
      setSets(String(exercise.sets));
      setRest(exercise.rest);
      setDuration(exercise.duration);
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
  function handleSearchPress() {
    const propsToSend = {
      name: exerciseName,
      exerciseList,
      reps,
      sets,
      duration,
      rest,
    };
    navigation.navigate("SearchBarComp", {
      index: route.params.index,
      propsToSend: propsToSend,
      workout: route.params.state,
    });
  }
  
  async function handleSubmitExercise(Delete) {
    let workout = route.params.state;

    if (Delete) {
      for (let i = 0; i < workout.exercises.length; ++i) {
        if (exerciseName == workout.exercises[i].name) {
          workout.exercises.splice(i, 1);
          break;
        }
      }
      navigation.navigate("New Workout", { state: workout });
    }
    
    const exerciseFromDb = await getSingleExercise(exerciseName);
    const exerciseToAdd = {
      name: exerciseName,
      difficulty: exerciseFromDb.difficulty,
      bodyPart: exerciseFromDb.bodyPart,
      basePoints: exerciseFromDb.basePoints,
      sets,
      reps,
      duration,
      rest,
    };

    if (route.params.index >= 0) {
      const newExerciseList = workout.exercises.map((exercise, index) => {
        if (index === route.params.index) return exerciseToAdd;
        return exercise;
      });
      workout.exercises = newExerciseList;
    } else {
      workout.exercises = [...workout.exercises, exerciseToAdd];
    }
    navigation.navigate("New Workout", { state: workout });
  }

  return (
    <TouchableWithoutFeedback
      bg="colors.bg"
      height="150%"
      onPress={Keyboard.dismiss}
    >
      <KeyboardAwareScrollView style={{ backgroundColor: "#1B1B3A" }}>
        <Center alignContent={"center"}>
          <Box marginTop="15%" alignSelf="center">
            <Text fontSize="3xl" color="colors.text">
              Create/Edit Exercise
            </Text>
          </Box>
          <VStack
            my="4"
            space={5}
            w="100%"
            maxW="300px"
            divider={
              <Box px="2">
                <Divider />
              </Box>
            }
          >
            <VStack space={5} textAlign={"center"} alignSelf="center">
              <Heading fontSize="lg" color="white" textAlign={"center"}>
                Exercise Name:{"\n"}
                {exerciseName}
              </Heading>
              <Button
                onPress={handleSearchPress}
                backgroundColor={"colors.text"}
                startIcon={
                  <Icon pl={0} as={MaterialIcons} name="search" size={5} />
                }
              >
                <Text color="white">Change Exercise Name</Text>
              </Button>
            </VStack>
          </VStack>
        </Center>
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
              Sets
            </FormControl.Label>
            <Select
              minWidth="200"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              color={"white"}
              placeholder={sets}
              selectedValue={String(sets)}
              mt={1}
              onValueChange={(num) => {
                setSets(String(num));
              }}
            >
              {optionsArr.map((num) => (
                <Select.Item key={num} label={num + ""} value={String(num)} />
              ))}
            </Select>
          </Box>
        </Center>
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
              Reps
            </FormControl.Label>
            <Select
              minWidth="200"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              color="white"
              placeholder={String(reps)}
              value={String(reps)}
              mt={1}
              onValueChange={(num) => {
                setReps(String(num));
              }}
            >
              {optionsArr.map((num) => (
                <Select.Item key={num} label={num + ""} value={String(num)} />
              ))}
            </Select>
          </Box>
        </Center>
        <Box minWidth="200" ml="10%" mr="10%">
          <Text
            textAlign={"center"}
            bold="true"
            color="colors.text"
            marginTop={4}
          >
            Duration
          </Text>
        </Box>

        <HStack space={2} marginTop="3" justifyContent={"center"}>
          <FormControl width={"40%"}>
            <Input
              placeholder="Minutes"
              variant="rounded"
              margin="2"
              color="colors.other"
              value={String(duration.minutes)}
              keyboardType="numeric"
              onChangeText={(mins) => {
                setDuration({
                  minutes: String(mins),
                  seconds: duration.seconds,
                });
              }}
            />
          </FormControl>
          <FormControl width={"40%"}>
            <Input
              placeholder="Seconds"
              variant="rounded"
              margin="2"
              color="colors.other"
              value={String(duration.seconds)}
              keyboardType="numeric"
              onChangeText={(secs) => {
                setDuration({
                  minutes: duration.minutes,
                  seconds: String(secs),
                });
              }}
            />
          </FormControl>
        </HStack>
        <Box minWidth="200" ml="10%" mr="10%">
          <Text
            textAlign={"center"}
            bold="true"
            color="colors.text"
            marginTop={4}
          >
            Rest Between Sets
          </Text>
        </Box>
        <HStack space={2} marginTop="3" justifyContent={"center"}>
          <FormControl width={"40%"}>
            <Input
              placeholder="Minutes"
              variant="rounded"
              margin="2"
              color="colors.other"
              value={String(rest.minutes)}
              keyboardType="numeric"
              onChangeText={(mins) => {
                setRest({
                  minutes: String(mins),
                  seconds: rest.seconds,
                });
              }}
            />
          </FormControl>
          <FormControl width={"40%"}>
            <Input
              placeholder="Seconds"
              variant="rounded"
              margin="2"
              color="colors.other"
              value={String(rest.seconds)}
              keyboardType="numeric"
              onChangeText={(secs) => {
                setRest({
                  minutes: rest.minutes,
                  seconds: String(secs),
                });
              }}
            />
          </FormControl>
        </HStack>
        <Box marginHorizontal={50} display={"flex"} flexDirection="row">
          <Button
            width="60%"
            backgroundColor={"colors.text"}
            flex={1}
            margin={5}
            onPress={() => handleSubmitExercise(true)}
          >
            Delete Exercise
          </Button>
        </Box>
        <Box marginHorizontal={50} display={"flex"} flexDirection="row">
          <Button
            width="60%"
            backgroundColor={"colors.text"}
            flex={1}
            margin={5}
            onPress={() => handleSubmitExercise()}
          >
            Submit Exercise
          </Button>
        </Box>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

import { View, Keyboard, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Input, Box, Icon, Button, VStack, HStack, Divider } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Item = ({ name, setCurrentWord }) => {
  function handleClick() {
    setCurrentWord(name);
  }
  return (
    <View>
      <Button
        name={name}
        variant="outline"
        borderColor={"colors.text"}
        _text={{ color: "white" }}
        onPress={handleClick}
      >
        {name}
      </Button>
    </View>
  );
};
export default function SearchBarComp({ route }) {
  const navigation = useNavigation();
  const propsFromCreateExercise = route.params.propsToSend;
  const [currentList, setCurrentList] = useState([]);
  const [currentWord, setCurrentWord] = useState("");

  useEffect(() => {
    setCurrentList(propsFromCreateExercise.exerciseList);
    setCurrentWord(propsFromCreateExercise.name);
    function reset() {
      setCurrentWord("");
      setCurrentList([]);
    }
    return reset;
  }, []);
  //make a use effect for everytime the list loads

  function handleSubmit() {
    console.log(currentWord, "search-result");
    const propsFromSearch = {
      name: currentWord,
      sets: propsFromCreateExercise.sets,
      reps: propsFromCreateExercise.reps,
      duration: propsFromCreateExercise.duration,
    };
    navigation.navigate("CreateEditExercise", {
      index: route.params.index,
      propsFromSearch: propsFromSearch,
      state: route.params.workout,
    });
  }
  //console.log(propsFromCreateExercise);
  const renderItem = ({ item }) => {
    // when no input, show all
    if (currentWord === "") {
      return <Item name={item.name} setCurrentWord={setCurrentWord} />;
    }
    // filter of the name

    if (
      currentWord &&
      item.name
        .toUpperCase()
        .includes(currentWord.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item.name} setCurrentWord={setCurrentWord}></Item>;
    }
  };
  return (
    <KeyboardAwareScrollView
      style={{ height: "150%", backgroundColor: "#1B1B3A" }}
    >
      <VStack
        space={5}
        bg="colors.bg"
        w="100%"
        height="100%"
        maxW="100%"
        divider={
          <Box px="2">
            <Divider />
          </Box>
        }
      >
        <VStack w="100%" space={5} my="10" alignSelf="center">
          <HStack>
            <Button
              backgroundColor={"colors.text"}
              w="100%"
              onPress={handleSubmit}
              _text={{ fontSize: "2xl" }}
            >
              Submit
            </Button>
          </HStack>
          <Input
            placeholder="Find exercise by name"
            width="99%"
            borderRadius="4"
            py="3"
            px="1"
            fontSize="14"
            color="white"
            value={currentWord}
            onChangeText={(text) => setCurrentWord(text)}
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="search" />}
              />
            }
            InputRightElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                onPress={() => {
                  setCurrentWord("");
                  Keyboard.dismiss;
                }}
                as={<MaterialIcons name="close" />}
              />
            }
          />
          <FlatList
            data={propsFromCreateExercise.exerciseList}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
          />
        </VStack>
      </VStack>
    </KeyboardAwareScrollView>
  );
}

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, FlatList, SafeAreaView } from "react-native";
import {
  KeyboardAvoidingView,
  Input,
  Box,
  Icon,
  Button,
  Center,
  flex,
  View,
  keyboardDismissHandlerManager,
  FormControl,
  ScrollView,
  VStack,
  Heading,
} from "native-base";
// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, details, setSearchPhrase }) => {
  function handleClick(evt) {
    console.log(evt.target.innerText);
    setSearchPhrase(evt.target.innerText);
  }
  return (
    <View>
      <Button name={name} onPress={handleClick}>
        {name}
      </Button>
    </View>
  );
};

// the filter
const List = (props) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (props.searchPhrase === "") {
      return (
        <Item
          name={item.name}
          details={item.details}
          setSearchPhrase={props.setSearchPhrase}
        />
      );
    }
    // filter of the name
    console.log(props.searchPhrase);
    if (
      props.searchPhrase &&
      item.name
        .toUpperCase()
        .includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Item name={item.name} setSearchPhrase={props.setSearchPhrase}></Item>
      );
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          props.setClicked(false);
        }}
      >
        <FlatList
          data={props.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          horizontal={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});

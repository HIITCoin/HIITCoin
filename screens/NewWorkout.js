import { StyleSheet, View, TouchableOpacity, Keyboard } from 'react-native'
import React, {useEffect, useState} from 'react'
import { KeyboardAvoidingView, Input, Box, Icon, Button, Center, flex, Text, keyboardDismissHandlerManager, Pressable, Badge, Spacer, Flex, HStack} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';
import { TouchableWithoutFeedback } from 'react-native';

const NewWorkout = () => {

  const navigation = useNavigation();


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView bg="colors.bg" height="100%"
      behavior="padding"
    >
      <Text>Hello World</Text>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
};

export default NewWorkout;

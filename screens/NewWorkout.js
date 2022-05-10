import { StyleSheet, View, TouchableOpacity, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { useEffect, useState } from 'react';
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
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';
import { TouchableWithoutFeedback } from 'react-native';

const NewWorkout = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAwareScrollView
      style={{ height: '150%', backgroundColor: '#1B1B3A' }}
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
                  color: 'colors.text',
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
              />
            </FormControl>
            <FormControl>
              <FormControl.Label
                marginBottom="0%"
                _text={{
                  bold: true,
                  ml: 5,
                  color: 'colors.text',
                }}
              >
                Rounds
              </FormControl.Label>
              <Input
                mx="3"
                placeholder="Rounds"
                w="75%"
                maxWidth="300px"
                secureTextEntry
                variant="rounded"
                margin="2"
                color="colors.other"
              />
            </FormControl>

            {/*firstName*/}
            <FormControl>
              <FormControl.Label
                marginBottom="0%"
                _text={{
                  bold: true,
                  ml: 5,
                  color: 'colors.text',
                }}
              >
                Rest Between Rounds
              </FormControl.Label>
              <Input
                mx="3"
                placeholder="Rest between rounds"
                w="75%"
                maxWidth="300px"
                variant="rounded"
                margin="2"
                color="colors.other"
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label
                marginBottom="0%"
                _text={{
                  bold: true,
                  ml: 5,
                  color: 'colors.text',
                }}
              >
                Last Name
              </FormControl.Label>
              <Input
                mx="3"
                placeholder="Last Name"
                w="75%"
                maxWidth="300px"
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
              />
            </FormControl>
            <FormControl isRequired>
              <FormControl.Label
                marginBottom="0%"
                _text={{
                  bold: true,
                  ml: 5,
                  color: 'colors.text',
                }}
              >
                Height
              </FormControl.Label>
              <Input
                mx="3"
                placeholder="Height(in inches)"
                w="75%"
                maxWidth="300px"
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
              />
            </FormControl>
          </Box>
          <Box marginHorizontal={50} display={'flex'} flexDirection="row">
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

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
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
  VStack,
  Heading,
  Select,
  CheckIcon,
  HStack,
  Divider,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export default function FacadeSearchBarComp(props) {
  const navigation = useNavigation();

  return (
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
      <VStack w="100%" space={5} alignSelf="center">
        <Heading fontSize="lg" color="white">
          Exercise Name
        </Heading>
        <Button
          startIcon={<Icon pl={0} as={MaterialIcons} name="search" size={5} />}
        >
          Change Exercise Name
        </Button>
      </VStack>
    </VStack>
  );
}

// InputLeftElement={
//     <Icon
//       m="2"
//       ml="3"
//       size="6"
//       color="gray.400"
//       as={<MaterialIcons name="search" />}
//       onPress={() => {
//         console.log("2ouo2");
//       }}
//     />
//   }
//   InputRightElement={
//     <Icon
//       m="2"
//       ml="3"
//       size="6"
//       color="gray.400"
//       as={<MaterialIcons name="close" />}
//     />
//   }

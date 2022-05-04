import React from "react";
import { NativeBaseProvider, Box, Text, extendTheme, StatusBar } from "native-base";
import { colorTheme } from "./misc/colorTheme";

const colors = extendTheme({ colors: colorTheme });

export default function App() {
  return (
    <NativeBaseProvider theme={colors}>
      <StatusBar hidden />
      <Box flex={1} bg='colors.bg' alignItems="center" justifyContent="center">
        <Text color='colors.text'>Hello!</Text>
      </Box>
    </NativeBaseProvider>
  );
}

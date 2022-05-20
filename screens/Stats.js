import { Pressable, Button, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  VStack,
  Box,
  HStack,
  Center,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";
import {
  sampleWorkoutInList,
  sampleWorkoutInHistory,
  sampleWorkoutInHistory2,
  calculatePoints,
} from "../misc/sampleData";
import { getWorkoutHistory } from "../misc/helperFunctions";

const Stats = () => {
  const navigation = useNavigation();
  const [arrWorkoutHistory, setArrWorkoutHistory] = useState([]);
  const [day, setDay] = useState("");

  useEffect(async () => {
    const workHistory = async () => {
      let arrWorkoutHistory = await getWorkoutHistory();
      return arrWorkoutHistory;
    };
    let arrWorkoutHistory = await workHistory();
    setArrWorkoutHistory(arrWorkoutHistory);
  }, []);

  const calcDate = (time) => {
    console.log(typeof time, time, "time");
    // console.log(time.getDate());
    let day;
    let month;
    if (typeof time === "object") {
      if (day === undefined) {
        day = time.nanoseconds.getDate();
        console.log(day, "day after getDate");
      }
      month = time.getMonth();
    }
    if (typeof time != "object") {
      day = time;
      month = time;
      // console.log(day, month);
    }
    if (month) {
      month = month.toString();
    }

    switch (month) {
      case "0":
        month = "January";
        break;
      case "1":
        month = "February";
        break;
      case "2":
        month = "March";
        break;
      case "3":
        month = "April";
        break;
      case "4":
        month = "May";
        break;
      case "5":
        month = "June";
        break;
      case "6":
        month = "July";
        break;
      case "7":
        month = "August";
        break;
      case "8":
        month = "September";
        break;
      case "9":
        month = "October";
        break;
      case "10":
        month = "November";
        break;
      case "11":
        month = "December";
        break;
      default:
        month = "No month";
    }
    console.log(day, month);
    return [month, day];
  };

  //this will be props

  // let arrWorkoutHistory = [sampleWorkoutInHistory, sampleWorkoutInHistory2];
  const calcWeeklyBodyPoints = (arrWorkoutHistory) => {
    let weekOne = 0;
    let weekTwo = 0;
    let weekThree = 0;
    let weekFour = 0;
    let weekOneWorkout = [];
    let weekTwoWorkout = [];
    let weekThreeWorkout = [];
    let weekFourWorkout = [];
    // console.log(arrWorkoutHistory);
    for (let i = 0; i < arrWorkoutHistory.length; i++) {
      // console.log(arrWorkoutHistory[i]);
      let exercises = arrWorkoutHistory[i].exercises;
      let date = calcDate(arrWorkoutHistory[i].date || new Date());
      let today = new Date();
      today = calcDate(today);
      if (date[0] != today[0]) {
        return "workout not completed this month";
      }
      if (date[1] < 8) {
        // console.log(date[0]);
        // if(date[0] !=
        for (let i = 0; i < exercises.length; i++) {
          weekOneWorkout.push(arrWorkoutHistory[i]);
          weekOne += calculatePoints(arrWorkoutHistory[i])[0];
        }
      } else if (date[1] < 15) {
        for (let i = 0; i < exercises.length; i++) {
          weekTwoWorkout.push(arrWorkoutHistory[i]);
          weekTwo += calculatePoints(arrWorkoutHistory[i])[0];
        }
      } else if (date[1] < 22) {
        for (let i = 0; i < exercises.length; i++) {
          weekThreeWorkout.push(arrWorkoutHistory[i]);
          weekThree += calculatePoints(arrWorkoutHistory[i])[0];
        }
      } else if (date[1] > 21) {
        for (let i = 0; i < exercises.length; i++) {
          weekFourWorkout.push(arrWorkoutHistory[i]);
          weekFour += calculatePoints(arrWorkoutHistory[i])[0];
        }
      }
    }
    return [weekOne, weekTwo, weekThree, weekFour];
  };
  let [weekOne, weekTwo, weekThree, weekFour] =
    calcWeeklyBodyPoints(arrWorkoutHistory);

  return (
    <KeyboardAvoidingView bg="colors.bg" height="100%">
      <Box marginTop="20%">
        <HStack justifyContent="space-between">
          <Pressable onPress={() => navigation.navigate("Home")}>
            <MaterialIcons name="home" size={50} color="#9067C6" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <MaterialIcons name="person" color="#9067C6" size={50} />
          </Pressable>
        </HStack>
      </Box>
      <Box marginBottom="5%">
        <Text fontSize="5xl" color="colors.text" textAlign="center">
          Statistics
        </Text>
        <Text fontSize="5xl" color="colors.text" textAlign="center">
          {/* {month} */}
          {calcDate(new Date())[0]}
        </Text>
      </Box>
      <BarChart
        data={{
          labels: ["1st - 7th", "8th - 14th", "15th - 21st", "22nd - 31st"],
          datasets: [
            {
              data: [weekOne, weekTwo, weekThree, weekFour],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={400}
        yAxisLabel=" Points "
        // yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#116a64",
          // backgroundColor: "#e26a00",
          backgroundGradientFrom: "#116a64",
          // backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default Stats;

/*

  npm install chart.js

  data runs on the x axis
  labels run on the y axis

*/

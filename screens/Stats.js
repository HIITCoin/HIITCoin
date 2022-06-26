import { Pressable, Button, Dimensions, ScrollView } from "react-native";
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
// import { BarChart } from "react-native-chart-kit";
import {
  exerciseInWorkout,
  exerciseInWorkout2,
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

  const calcDate = (milliseconds) => {
    let time, day, month, year;
    if (typeof milliseconds === "number") time = new Date(milliseconds);
    else time = milliseconds;
    if (typeof time === "object") {
      if (day === undefined) {
        day = time.getDate();
      }
      month = time.getMonth();
      year = time.getFullYear();
    }
    if (typeof time != "object") {
      day = time;
      month = time;
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
    return [month, day, year];
  };

  const calcWeeklyBodyPoints = (arrWorkoutHistory2) => {
    if (!arrWorkoutHistory2.length) return [0, 0, 0, 0, 0];
    let weekOne = 0;
    let weekTwo = 0;
    let weekThree = 0;
    let weekFour = 0;
    let grandTotal = 0;
    for (let i = 0; i < arrWorkoutHistory.length; i++) {
      let date = calcDate(
        arrWorkoutHistory[i].date.seconds * 1000 || new Date().getTime()
      );
      let today = new Date();
      today = calcDate(today.getTime());
      if (date[0] === today[0] && date[2] === date[2]) {
        grandTotal += arrWorkoutHistory[i].total;
        if (date[1] < 8) {
          weekOne += arrWorkoutHistory[i].total;
        } else if (date[1] < 15) {
          weekTwo += arrWorkoutHistory[i].total;
        } else if (date[1] < 22) {
          weekThree += arrWorkoutHistory[i].total;
        } else if (date[1] > 21) {
          weekFour += arrWorkoutHistory[i].total;
        }
      }
    }
    return [weekOne, weekTwo, weekThree, weekFour, grandTotal];
  };
  let [weekOne, weekTwo, weekThree, weekFour, grandTotal] =
    calcWeeklyBodyPoints(arrWorkoutHistory);
  console.log([weekOne, weekTwo, weekThree, weekFour, grandTotal]);
  console.log(arrWorkoutHistory);
  return (
    <Box bg="colors.bg" height="100%">
      <ScrollView bg="colors.bg" height="100%">
        <Box marginTop="10%" bg="colors.bg">
          <HStack justifyContent="space-between">
            <Pressable onPress={() => navigation.navigate("Home")}>
              <MaterialIcons name="home" size={50} color="#9067C6" />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Profile")}>
              <MaterialIcons name="person" color="#9067C6" size={50} />
            </Pressable>
          </HStack>
        </Box>
        <Box marginBottom="1%">
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
          // yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            fillShadowGradientFrom: "#9067C6",
            fillShadowGradientOpacity: 1,
            fillShadowGradientTo: "#9067C6",
            backgroundGradientFrom: "#1B1B3A",
            backgroundGradientTo: "#1B1B3A",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => {
              return `rgba(200, 200, 200, ${1})`;
            },
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#9067C6",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <Text textAlign={"center"} color={"colors.text"} fontSize="3xl">
          Total All Time Points: {grandTotal} {"\n"}
          Nice one Champ
        </Text>
      </ScrollView>
    </Box>
  );
};

export default Stats;

/*

  npm install chart.js

  data runs on the x axis
  labels run on the y axis

*/

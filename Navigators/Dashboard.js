import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import SinglePrayerRequestScreen from "../Screens/SinglePrayerRequestScreen";

const Stacks = createNativeStackNavigator();

const Dashboard = () => {
  return (
    <Stacks.Navigator>
      <Stacks.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
        }}
      />
      <Stacks.Screen
        name="SinglePrayerRequestScreen"
        component={SinglePrayerRequestScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
        }}
      />
    </Stacks.Navigator>
  );
};

export default Dashboard;
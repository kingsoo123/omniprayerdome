import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";

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
    </Stacks.Navigator>
  );
};

export default Dashboard;

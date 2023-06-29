import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "react-native-elements";
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
          tabBarIcon: ({ color, size }) => (
            <Icon
              type="material-community"
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Stacks.Navigator>
  );
};

export default Dashboard;

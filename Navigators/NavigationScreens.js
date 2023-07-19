import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../Screens/LoginScreen";
import RegisterScreen from "../Screens/RegisterScreen";
import HomeScreen from "../Screens/HomeScreen";
import { useSelector } from "react-redux";
import DrawerNavigator from "./DrawerNavigator";
import OpeningScreen from "../Screens/OpeningScreen";

const Stacks = createNativeStackNavigator();

const NavigationScreens = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <Stacks.Navigator>
        {auth.isAuth ? (
          <>
            <Stacks.Screen
              name="DrawerNavigator"
              component={DrawerNavigator}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stacks.Screen
              name="OpeningScreen"
              component={OpeningScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stacks.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stacks.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}

        {/* <Stacks.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        /> */}
      </Stacks.Navigator>
    </NavigationContainer>
  );
};

export default NavigationScreens;

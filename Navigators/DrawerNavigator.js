import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from "react-native-elements";
import Dashboard from "./Dashboard";
import DrawerContent from "../component/DrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          title: "Client",
          drawerIcon: () => (
            <Icon
              type="material-community"
              name="home"
              size={21}
              color={"#7cc"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

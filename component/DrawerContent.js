import React, { useState, useEffect } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { Icon, Avatar } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { lightAction, darkAction } from "../Slice/SwitchTheme";
import { logOut } from "../Slice/AuthSlice";
import { auth } from "../firebase/firebase-config";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DrawerContent = (props) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.switch);
  const [isEnabled, setIsEnabled] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("displayName");
        setName(value);
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (theme.theme === "light") {
      dispatch(darkAction());
    } else {
      dispatch(lightAction());
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(logOut());
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={{ backgroundColor: "#1895b9", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 20,
            }}
          >
            <Avatar
              rounded
              avatarStyle={styles.avatar}
              size={75}
              source={{
                uri: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
              }}
            />
            <View style={{ marginLeft: 20 }}>
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 18 }}
              >
                {name}
              </Text>
              <Text style={{ color: "white", fontSize: 14 }}>
                Great to have you back!
              </Text>
            </View>
          </View>
        </View>

        {[
          { name: "Home", iconName: "home", routeName: "HomeScreen" },
          {
            name: "Settings",
            iconName: "cog-outline",
            routeName: "HomeScreen",
          },
        ].map((item, id) => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate(routeName)}
            key={id}
          >
            <DrawerItem
              label={item.name}
              icon={({ color, size }) => (
                <Icon
                  type="material-community"
                  name={item.iconName}
                  color={color}
                  size={size}
                />
              )}
            />
          </TouchableOpacity>
        ))}

        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: "#1895b9",
            marginTop: 60,
          }}
        >
          <Text style={styles.preferences}>Preferences</Text>
          <View style={styles.switchText}>
            <Text style={styles.darkThemeText}>
              {theme.theme === "light" ? "Dark theme" : "Light theme"}
            </Text>
            <View style={{ paddingRight: 10 }}>
              <Switch
                trackColor={{ false: "#767577", true: "#1895b9" }}
                thumbColor={!true ? "#1895b9" : "#ffffff"}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>

      <TouchableOpacity>
        <DrawerItem
          label="Sign out"
          icon={({ color, size }) => (
            <Icon
              type="material-community"
              name="logout-variant"
              color={color}
              size={size}
            />
          )}
          onPress={() => handleSignOut()}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    borderWidth: 4,
    borderColor: "white",
  },
  preferences: {
    fontSize: 16,
    color: "#1895b9",
    paddingTop: 10,
    paddingLeft: 15,
  },
  switchText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingVertical: 5,
    paddingRight: 10,
  },
  darkThemeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1895b9",
    paddingLeft: 0,
  },
});

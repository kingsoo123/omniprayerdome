import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, StyleSheet, Switch } from "react-native";
import { Icon, Avatar } from "react-native-elements";

const DrawerContent = (props) => {
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
                John Doe
              </Text>
              <Text style={{ color: "white", fontSize: 14 }}>
                Johndoe@gmail.com
              </Text>
            </View>
          </View>
        </View>

        {[{ name: "Settings", iconName: "cog-outline" }].map((item, id) => (
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
            key={id}
          />
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
            <Text style={styles.darkThemeText}>Dark theme</Text>
            <View style={{ paddingRight: 10 }}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={!true ? "#f5dd4b" : "#f4f3f4"}
              />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>

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
      />
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

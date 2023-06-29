import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { Icon, Avatar } from "react-native-elements";
import Replies from "../component/Replies";

const SinglePrayerRequestScreen = ({ navigation, route }) => {
  const theme = useSelector((state) => state.switch);
  const single = route.params.data;
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        backgroundColor: theme.theme === "light" ? "#ffffff" : "#000000",
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      {/* <KeyboardAvoidingView
        behavior="padding"
        style={{ justifyContent: "space-between", flex: 1 }}
      > */}
      <View style={{ top: Constants.statusBarHeight }}>
        <View style={styles.headerView}>
          <Icon
            name="keyboard-backspace"
            type="material-community"
            iconStyle={{ color: "#1895b9" }}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View>
          <View style={styles.requestView}>
            <View style={{ flexDirection: "row" }}>
              <Avatar
                rounded
                size={55}
                source={{
                  uri: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
                }}
              />
            </View>
            <View style={{ marginLeft: 20, paddingRight: 30 }}>
              <Text
                style={{
                  ...styles.username,
                  color: theme.theme === "light" ? "#000000" : "#ffffff",
                }}
              >
                {single?.user}
              </Text>
              <Text style={styles.when}>{single?.time}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SinglePrayerRequestScreen")}
              >
                <Text style={styles.prayerRequest}>{single?.request}</Text>
              </TouchableOpacity>

              <View
                style={{
                  width: "100%",
                  height: 20,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginTop: 20,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity>
                    <Icon
                      name="heart"
                      type="material-community"
                      iconStyle={{ color: "#1895b9" }}
                      size={24}
                    />
                  </TouchableOpacity>

                  <Text
                    style={{
                      marginLeft: 5,
                      color: theme.theme === "light" ? "#000000" : "#ffffff",
                    }}
                  >
                    {single?.likes}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 20,
                  }}
                >
                  <Icon
                    name="repeat-variant"
                    type="material-community"
                    iconStyle={{ color: "#1895b9" }}
                    size={26}
                  />

                  <Text
                    style={{
                      marginLeft: 5,
                      marginTop: 5,
                      color: theme.theme === "light" ? "#000000" : "#ffffff",
                    }}
                  >
                    {single?.replies}
                  </Text>
                </View>
              </View>
              <Replies signle={single} />
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          ...styles.textInput1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Leave your prayer"
          style={{ marginLeft: 10, flex: 1 }}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity>
          <Icon
            name="send"
            type="material"
            iconStyle={{ color: "#1895b9" }}
            size={30}
          />
        </TouchableOpacity>
      </View>
      {/* </KeyboardAvoidingView> */}
    </KeyboardAvoidingView>
  );
};

export default SinglePrayerRequestScreen;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  requestView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    marginTop: 20,
    paddingBottom: 50,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  when: {
    color: "gray",
    letterSpacing: 1,
  },
  prayerRequest: {
    color: "#1895b9",
    marginTop: 10,
    lineHeight: 20,
    letterSpacing: 1,
  },
  textInput1: {
    borderWidth: 0.2,
    borderColor: "#86939e",
    marginHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: "white",
    padding: 20,
  },
});

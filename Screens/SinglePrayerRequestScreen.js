import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon, Avatar } from "react-native-elements";
import Replies from "../component/Replies";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase/firebase-config";
import { doc, updateDoc, getDoc } from "firebase/firestore/lite";

const SinglePrayerRequestScreen = ({ navigation, route }) => {
  const theme = useSelector((state) => state.switch);
  const prayer = route.params.data;
  const [single, setPrayer] = useState(prayer);
  const [prayerComment, setPrayerComment] = useState("");
  const [name, setName] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const ref = useRef();

  //console.log(prayer.id, "STATEEEEEEEE");

  const contributePrayers = async (id, prayer, response) => {
    response.push({
      request: prayer,
      likes: 0,
      user: name,
      response_id: uuidv4(),
    });
    const newComment = {
      responses: response,
    };

    const prayerDoc = doc(db, "prayer_request", id);
    await updateDoc(prayerDoc, newComment);
    setIsClicked(false);
  };

  useEffect(() => {
    const getPrayer = async () => {
      try {
        //console.log(prayer.id, "IDDDDDDDDDD");
        const docRef = doc(db, "prayer_request", prayer.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          //console.log(docSnap.data(), "YESSS DOCCSSSS");
          setPrayer(docSnap.data());
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.log(error);
        setIsClicked(false);
      }
    };
    getPrayer();
  }, [isClicked]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("displayName");
        setName(value);
      } catch (e) {
        // error reading value
        console.log(e);
      }
    };
    getData();
  }, [isClicked]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        backgroundColor: theme.theme === "light" ? "#ffffff" : "#000000",
        flex: 1,
        justifyContent: "space-between",
      }}
    >
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
              <TouchableOpacity>
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
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="heart"
                      type="material-community"
                      iconStyle={{ color: "#1895b9" }}
                      size={24}
                    />

                    <Text
                      style={{
                        marginLeft: 5,
                        color: theme.theme === "light" ? "#000000" : "#ffffff",
                      }}
                    >
                      {single?.likes}
                    </Text>
                  </View>
                </TouchableOpacity>
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
                    {single?.responses?.length}
                  </Text>
                </View>
              </View>
              <Replies
                signle={prayer.responses}
                id={prayer.id}
                // setPrayer={setPrayer}
                // setIsClicked={setIsClicked}
              />
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          ...styles.textInput1,
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          bottom: Dimensions.get("window").height / 30,
          right: 0,
        }}
      >
        <TextInput
          placeholder="Leave your prayer"
          style={{ marginLeft: 10, flex: 1 }}
          underlineColorAndroid="transparent"
          onChangeText={(text) => setPrayerComment(text)}
          ref={ref}
        />
        <TouchableOpacity
          onPress={() => {
            //console.log(prayer.id, single.responses, "FROMMMMMMMMMM");
            contributePrayers(prayer.id, prayerComment, single.responses);
            ref.current.clear();
            setIsClicked(true);
          }}
        >
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
  },
  username: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 1,
    marginTop: 10,
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

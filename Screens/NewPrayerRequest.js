import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { notificationAction } from "../Slice/NotificationSlice";
import { db } from "../firebase/firebase-config";
import { addDoc, collection } from "firebase/firestore/lite";
import AsyncStorage from "@react-native-async-storage/async-storage";

const tagsPrayer = [
  { title: "Deliverance", id: 0 },
  { title: "Miracles", id: 1 },
  { title: "Healing", id: 2 },
  { title: "Increase", id: 3 },
  { title: "Breakthrough", id: 4 },
  { title: "Salvation", id: 5 },
  { title: "Fruitfulness", id: 6 },
  { title: "Mercy", id: 7 },
  { title: "Faithfulness", id: 8 },
  { title: "Loving kindness", id: 9 },
  { title: "Forgiveness", id: 10 },
  { title: "Testimonies", id: 11 },
];

const NewPrayerRequest = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.switch);
  const collectionRef = collection(db, "prayer_request");
  const [done, setDone] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  const ref = useRef();

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

  const [prayerRequest, setPrayerRequest] = useState({
    likes: 0,
    request: "",
    responses: [],
    when: new Date(),
  });

  const handleSelect = (item) => {
    if (selected.includes(item)) {
      const removeItem = selected.filter((value) => value !== item);
      setSelected(removeItem);
    } else {
      setSelected([...selected, item]);
    }
  };

  async function createNewPrayerRequest() {
    try {
      setDone("Prayer request added");
      await addDoc(collectionRef, {
        ...prayerRequest,
        user: name,
        tags: selected,
      });
      setLoading(false);
      dispatch(
        notificationAction({ message: prayerRequest.request, poster: name })
      );
      ref.current.clear();
      navigation.navigate("HomeScreen");
      setSelected([]);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (loading) {
      createNewPrayerRequest();
    }
  }, [loading]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.theme === "light" ? "#1895b9" : "#000000",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            marginTop: 10,
            color: "#ffffff",
          }}
        >
          + Prayer Request
        </Text>

        <View
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#ffffff",
            height:
              Platform.OS === "ios"
                ? 400
                : Platform.OS === "android"
                ? "70%"
                : 400,
            borderRadius: 20,
            marginTop: 20,
            justifyContent: "space-between",
          }}
        >
          <TextInput
            placeholder="Enter your prayer request here..."
            ref={ref}
            multiline={true}
            numberOfLines={10}
            style={{
              letterSpacing: 3,
              padding: 5,
              paddingVertical: 10,
              marginTop:
                Platform.OS === "ios"
                  ? 20
                  : Platform.OS === "android"
                  ? -50
                  : 20,
            }}
            onChangeText={(text) => {
              setPrayerRequest({ ...prayerRequest, request: text });
              setTimeout(() => {
                setDone("");
              }, 5000);
            }}
          />

          <View>
            <Text style={{ fontWeight: "bold", marginBottom: 20 }}>
              Select tags
            </Text>
            <View style={styles.trendingView}>
              {tagsPrayer.map((item) => (
                <TouchableOpacity
                  onPress={() => {
                    handleSelect(item.title);
                  }}
                  key={item.id}
                >
                  <View
                    style={{
                      backgroundColor: selected.includes(item.title)
                        ? "#1895b9"
                        : "#EFEFEF",
                      borderRadius: 15,
                      padding: 2,
                      marginTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: selected.includes(item.title)
                          ? "#ffffff"
                          : "#1895b9",
                        letterSpacing: 1,
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <Text style={{ color: "#ffffff", textAlign: "center" }}>{done}</Text>

        <TouchableOpacity
          onPress={() => {
            //createNewPrayerRequest();
            setLoading(true);
          }}
        >
          <View
            style={{
              ...styles.button1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                color: "#ffffff",
                fontSize: 20,
              }}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                "Create"
              )}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NewPrayerRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 50,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    elevation: 30,
    padding: 30,
    justifyContent: "space-between",
  },

  smallCircle: {
    width: 50,
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  button1: {
    borderWidth: 0.2,
    borderColor: "#ffffff",
    marginHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#1895b9",
    padding: 20,
    marginTop: Platform.OS === "ios" ? 10 : Platform.OS === "android" ? 0 : 10,
  },
  trendingView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 6,
  },
});

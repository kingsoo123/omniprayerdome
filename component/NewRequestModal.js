import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { notificationAction } from "../Slice/NotificationSlice";
import { TouchableOpacity } from "react-native";
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

const NewRequestModal = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.switch);
  const collectionRef = collection(db, "prayer_request");
  const [done, setDone] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  const ref = useRef();

  console.log(selected, "SELECTED DATA");

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
  }, []);

  const [prayerRequest, setPrayerRequest] = useState({
    likes: 0,
    request: "God is the greates and the King of kings.",
    responses: [],
    when: new Date(),
  });

  //console.log(name, prayerRequest.request, "DDDD");

  //console.log(prayerRequest);
  //console.log(selected);
  const handleSelect = (item) => {
    if (selected.includes(item)) {
      setSelected(selected);
    } else {
      setSelected([...selected, item]);
    }
  };

  const createNewPrayerRequest = async () => {
    setLoading(true);
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
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.theme === "light" ? "#1895b9" : "#000000",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <View style={styles.smallCircle}>
              <Icon
                name="window-close"
                type="material-community"
                iconStyle={{ color: "#000000" }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            marginTop: 30,
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
            height: 400,
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
              paddingVertical: 20,
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
                    console.log(item.title, "ITEMSSSS");
                    //setSelected(item.title)
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
                      marginTop: 10,
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
            createNewPrayerRequest();
            ref.current.clear();
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

export default NewRequestModal;

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
    borderRadius: "100%",
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
    marginTop: 10,
  },
  trendingView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 6,
  },
});

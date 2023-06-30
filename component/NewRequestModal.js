import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

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
  const theme = useSelector((state) => state.switch);

  const [selected, setSelected] = useState([]);
  console.log(selected);
  const handleSelect = (item) => {
    if (selected.includes(item)) {
      setSelected(selected);
    } else {
      setSelected([...selected, item]);
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
            multiline={true}
            numberOfLines={10}
            style={{
              letterSpacing: 3,
              padding: 5,
              paddingVertical: 20,
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

        <TouchableOpacity>
          <View
            style={{
              ...styles.button1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              name="send"
              type="material"
              iconStyle={{ color: "#ffffff" }}
              size={30}
            />
            <Text
              style={{
                fontWeight: "500",
                color: "#ffffff",
                fontSize: 20,
              }}
            >
              Create
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

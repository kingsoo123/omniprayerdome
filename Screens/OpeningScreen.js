import { StyleSheet, ImageBackground } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Video, ResizeMode } from "expo-av";

const OpeningScreen = ({ navigation }) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("LoginScreen");
    }, 3000);
  }, []);
  const image = {
    uri: "https://cdn.pixabay.com/photo/2017/08/07/14/19/people-2604321_1280.jpg",
  };

  return (
    <ImageBackground source={image} style={styles.container}></ImageBackground>
  );
};

export default OpeningScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { auth } from "../firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCred) => {
        const user = userCred.user;
        setLoading(false);
      })
      .catch((error) => {
        setError(`There seems to be a problem with what you typed`);
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.bitText}>Register to get </Text>
        <Text style={styles.bitText}>an account</Text>
        <Text style={styles.smallText}>If you have an account</Text>
      </View>
      <View style={styles.bottomView}>
        <View style={{ marginTop: 30 }}>
          <View
            style={{
              ...styles.textInput1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              name="person"
              type="material"
              iconStyle={{ color: "#1895b9" }}
            />
            <TextInput
              placeholder="Name"
              style={{ marginLeft: 10, flex: 1 }}
              underlineColorAndroid="transparent"
              onChangeText={(text) => {
                setError("");
                setUserData({ ...userData, username: text });
              }}
            />
          </View>
          <View
            style={{
              ...styles.textInput1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              name="email"
              type="material"
              iconStyle={{ color: "#1895b9" }}
            />
            <TextInput
              placeholder="Email"
              style={{ marginLeft: 10, flex: 1 }}
              underlineColorAndroid="transparent"
              onChangeText={(text) => {
                setUserData({ ...userData, email: text });
                setError("");
              }}
            />
          </View>
          <View
            style={{
              ...styles.textInput1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder="Password"
              style={{ marginLeft: 10, flex: 1 }}
              underlineColorAndroid="transparent"
              onChangeText={(text) => {
                setUserData({ ...userData, password: text });
                setError("");
              }}
            />
            <Icon
              name="visibility-off"
              type="material"
              iconStyle={{ color: "#1895b9" }}
            />
          </View>
          <TouchableOpacity onPress={() => handleSubmit()}>
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
                  "Register"
                )}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <Text style={{ fontWeight: "500" }}>Have an account?</Text>

          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={{ color: "#1895b9" }}> Login</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ marginTop: 40, color: "red", textAlign: "center" }}>
          {error}
        </Text>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    height: "100%",
  },
  topView: {
    height: "30%",
    backgroundColor: "#1D2F3D",
    justifyContent: "flex-end",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  bottomView: {
    height: "70%",
    backgroundColor: "#ffffff",
    paddingVertical: 30,
  },
  bitText: {
    fontSize: 48,
    color: "#ffffff",
    fontWeight: "bold",
  },
  smallText: {
    color: "#ddd",
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
  button1: {
    borderWidth: 0.2,
    marginHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#1895b9",
    padding: 20,
    marginTop: 10,
  },
});

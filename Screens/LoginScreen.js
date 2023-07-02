import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "react-native-elements";
import { auth } from "../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signIn } from "../Slice/AuthSlice";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCred) => {
        const user = userCred.user;
        //console.log(user.email, "USERSSS");
        dispatch(signIn());
        setLoading(false);
      })
      .catch((error) => {
        setError(`Check the info you typed`);
        setLoading(false);
      });
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.topView}>
          <Text style={styles.bitText}>Sign in to your</Text>
          <Text style={styles.bitText}>Account</Text>
          <Text style={styles.smallText}>If you have an account</Text>
        </View>
        <View style={styles.bottomView}>
          <View style={{ marginTop: 10 }}>
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
                  setError("");
                  setUserData({ ...userData, email: text });
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
                  setError("");
                  setUserData({ ...userData, password: text });
                }}
              />
              <Icon
                name="visibility-off"
                type="material"
                iconStyle={{ color: "#1895b9" }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 30,
                justifyContent: "flex-end",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ fontWeight: "500", color: "#1895b9" }}>
                Forgot password?
              </Text>
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
                    "Login"
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
            <Text style={{ fontWeight: "500" }}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              <Text style={{ color: "#1895b9" }}> Register</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ marginTop: 5, color: "red", textAlign: "center" }}>
            {error}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  topView: {
    height:
      Platform.OS === "ios" ? "30%" : Platform.OS === "android" ? "30%" : "",
    backgroundColor: "#1D2F3D",
    justifyContent: "flex-end",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  bottomView: {
    flex: 1,
    // Platform.OS === "ios" ? "50%" : Platform.OS === "android" ? "50%" : "",
    backgroundColor: "#ffffff",
    paddingVertical: 30,
  },
  bitText: {
    fontSize: Platform.OS === "ios" ? 48 : Platform.OS === "android" ? 30 : "",
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
    padding: Platform.OS === "ios" ? 20 : Platform.OS === "android" ? 10 : "",
  },
  button1: {
    borderWidth: 0.2,
    marginHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#1895b9",
    padding: Platform.OS === "ios" ? 20 : Platform.OS === "android" ? 10 : "",
    marginTop: 10,
  },
});

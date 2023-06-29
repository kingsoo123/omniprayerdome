import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.bitText}>Sign in to your</Text>
        <Text style={styles.bitText}>Account</Text>
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
              name="email"
              type="material"
              iconStyle={{ color: "#1895b9" }}
            />
            <TextInput
              placeholder="Email"
              style={{ marginLeft: 10, flex: 1 }}
              underlineColorAndroid="transparent"
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
              Login
            </Text>
          </View>
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
      </View>
    </View>
  );
};

export default LoginScreen;

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

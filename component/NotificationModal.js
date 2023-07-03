import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { notificationAction } from "../Slice/NotificationSlice";
import { useSelector, useDispatch } from "react-redux";

const NotificationModal = ({ setShowNotificationModal }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.switch);
  const newNotification = useSelector((state) => state.notification);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.theme === "light" ? "#1895b9" : "#000000",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.headerView}>
            <Icon
              name="keyboard-backspace"
              type="material-community"
              iconStyle={{ color: "#ffffff" }}
              onPress={() => setShowNotificationModal(false)}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              dispatch(notificationAction(null));
            }}
          >
            <View style={styles.smallCircle}>
              <Text>Clear all</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ marginTop: 30 }}>
          {newNotification?.newPostArray.length === 0 ? (
            <Text style={{ color: "#ffffff", fontSize: 18 }}>
              No new notification
            </Text>
          ) : (
            newNotification?.newPostArray?.map((item, id) => (
              <View
                key={id}
                style={{
                  width: "80%",
                  backgroundColor: "#ffffff",
                  borderRadius: 10,
                  padding: 15,
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "#1895b9", fontSize: 16 }}>
                  A new prayer request has been posted, Kindly join your faith
                  with
                </Text>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    padding: 5,
                  }}
                >
                  <Text
                    style={{
                      backgroundColor: "#1895b9",
                      padding: 5,
                      borderRadius: 3,
                      color: "#ffffff",
                    }}
                  >
                    By {item.poster}
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NotificationModal;

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
    justifyContent: "flex-start",
  },

  smallCircle: {
    backgroundColor: "#ffffff",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Icon, Avatar } from "react-native-elements";
import { useSelector } from "react-redux";

const Replies = ({ signle }) => {
  const theme = useSelector((state) => state.switch);
  const commenters = signle?.responses;
  console.log(signle?.responses, "PROPPSSSS....");

  return (
    <View>
      <ScrollView>
        {commenters.map((comment, id) => (
          <View style={styles.requestView} key={id}>
            <View style={{ flexDirection: "row" }}>
              <Avatar
                rounded
                avatarStyle={styles.avatar}
                size={25}
                source={{
                  uri: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
                }}
              />
            </View>
            <View style={{ marginLeft: 20, paddingRight: 30 }}>
              <Text
                style={
                  (styles.username,
                  {
                    color: theme.theme === "light" ? "#000000" : "#ffffff",
                  })
                }
              >
                {comment?.user}
              </Text>
              <Text style={styles.when}>{comment?.time}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SinglePrayerRequestScreen", {
                    data: item,
                  })
                }
              >
                <Text style={styles.prayerRequest}>{comment?.request}</Text>
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
                    {comment?.likes}
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
                    {comment?.replies}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Replies;

const styles = StyleSheet.create({
  requestView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    marginTop: 20,
    paddingBottom: 50,
    paddingRight: 40,
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
});

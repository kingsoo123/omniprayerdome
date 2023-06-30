import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  ImageBackground,
} from "react-native";
import { Icon, withBadge, Avatar } from "react-native-elements";
import { useSelector } from "react-redux";
import NewRequestModal from "../component/NewRequestModal";

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

const prayerList = [
  {
    user: "John",
    time: "2h ago",
    request: `I'm expecting the fruit of womb, I want the brethren please pray along with me and conect their faith mine as I wait on God.`,
    likes: "230",
    replies: "20",
    responses: [
      {
        user: "John",
        time: "2h ago",
        request: `I'm expecting the fruit of womb, I want the brethren please pray along with me and conect their faith mine as I wait on God.`,
        likes: "230",
        replies: "20",
      },
    ],
    id: 0,
  },

  {
    user: "Thomas",
    time: "2h ago",
    request: `I'm expecting the fruit of womb, I want the brethren please pray along with me and conect their faith mine as I wait on God.`,
    likes: "230",
    replies: "20",
    responses: [
      {
        user: "John",
        time: "2h ago",
        request: `I'm expecting the fruit of womb, I want the brethren please pray along with me and conect their faith mine as I wait on God.`,
        likes: "230",
        replies: "20",
      },
    ],
    id: 1,
  },
  {
    user: "Steven",
    time: "2h ago",
    request: `I'm expecting the fruit of womb, I want the brethren please pray along with me and conect their faith mine as I wait on God.`,
    likes: "230",
    replies: "20",
    responses: [
      {
        user: "John",
        time: "2h ago",
        request: `I'm expecting the fruit of womb, I want the brethren please pray along with me and conect their faith mine as I wait on God.`,
        likes: "230",
        replies: "20",
      },
    ],
    id: 2,
  },
  {
    user: "Chris",
    time: "2h ago",
    request: `I'm expecting the fruit of womb, I want the brethren please pray along with me and conect their faith mine as I wait on God.`,
    likes: "230",
    replies: "20",
    responses: [
      {
        user: "John",
        time: "2h ago",
        request: `I'm expecting the fruit of womb, I want the brethren please pray along with me and conect their faith mine as I wait on God.`,
        likes: "230",
        replies: "20",
      },
    ],
    id: 3,
  },
];

const HomeScreen = ({ navigation }) => {
  const theme = useSelector((state) => state.switch);
  const BadgeIcon = withBadge(0)(Icon);
  const [showModal, setShowModal] = useState(false);
  const [getPrayerUser, setGetPrayerUser] = useState("");

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme.theme === "light" ? "#ffffff" : "#000000",
      }}
    >
      <View style={styles.headerView}>
        <Icon
          name="menu"
          type="material-community"
          iconStyle={{ color: "#1895b9" }}
          onPress={() => navigation.toggleDrawer()}
        />
        <Image
          source={require("../assets/logo3.png")}
          style={{ width: 150, height: 70, marginTop: -15 }}
        />
        <BadgeIcon
          type="material-community"
          name="bell"
          size={35}
          color={"#1895b9"}
        />
      </View>
      <ImageBackground
        source={{
          uri: "https://cdn.pixabay.com/photo/2016/11/22/23/15/cliffs-1851113_1280.jpg",
        }}
        style={styles.greetings}
      >
        <Text style={styles.bitText}>
          And said to them, it is written, my house shall be called the house of
          prayer
        </Text>
        <Text style={{ color: "white" }}>(Matthew 21:13)</Text>
      </ImageBackground>

      <ScrollView>
        <View
          style={
            (styles.trendingView,
            {
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginTop: 10,
              backgroundColor: theme.theme === "light" ? "#ffffff" : "#000000",
            })
          }
        >
          <Text
            style={{
              fontWeight: "bold",
              color: theme.theme === "light" ? "#000000" : "#ffffff",
            }}
          >
            Trending prayers
          </Text>
        </View>

        <View style={styles.trendingView}>
          {tagsPrayer.map((item) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PrayersByTag", { data: prayerList })
              }
              key={item.id}
            >
              <View style={styles.tags}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#1895b9",
                    letterSpacing: 1,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={
            (styles.trendingView,
            { paddingHorizontal: 20, paddingVertical: 10, marginTop: 10 })
          }
        >
          <Text
            style={{
              fontWeight: "bold",
              color: theme.theme === "light" ? "#000000" : "#ffffff",
            }}
          >
            All Requests
          </Text>

          <View style={{ paddingBottom: 200 }}>
            {prayerList.map((prayer) => (
              <View style={styles.requestView} key={prayer.id}>
                <View style={{ flexDirection: "row" }}>
                  <Avatar
                    rounded
                    avatarStyle={styles.avatar}
                    size={45}
                    source={{
                      uri: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
                    }}
                  />
                </View>
                <View style={{ marginLeft: 20, paddingRight: 30 }}>
                  <Text style={styles.username}>{prayer.user}</Text>
                  <Text style={styles.when}>{prayer.time}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("SinglePrayerRequestScreen", {
                        data: prayer,
                      })
                    }
                  >
                    <Text style={styles.prayerRequest}>{prayer.request}</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: "100%",
                      height: 20,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginTop: 20,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
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
                          color:
                            theme.theme === "light" ? "#000000" : "#ffffff",
                        }}
                      >
                        {prayer.likes}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
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
                          color:
                            theme.theme === "light" ? "#000000" : "#ffffff",
                        }}
                      >
                        {prayer.replies}
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Icon
                          name="delete"
                          type="material-community"
                          iconStyle={{ color: "#1895b9" }}
                          size={26}
                        />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        console.log(prayer.id, "PRAYERRRR");
                        setGetPrayerUser(prayer.id);
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 2,
                          marginRight: 10,
                        }}
                      >
                        <Icon
                          name="comment"
                          type="material-community"
                          iconStyle={{ color: "#1895b9" }}
                          size={20}
                        />

                        <Text
                          style={{
                            marginLeft: 5,
                            color:
                              theme.theme === "light" ? "#000000" : "#ffffff",
                          }}
                        >
                          Pray
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  {getPrayerUser === prayer.id && (
                    <View
                      style={{
                        ...styles.textInput1,
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: 20,
                      }}
                    >
                      <TextInput
                        placeholder="Leave your prayer"
                        style={{ marginLeft: 30, flex: 1 }}
                        underlineColorAndroid="transparent"
                      />
                      <TouchableOpacity onPress={() => setGetPrayerUser("")}>
                        <Icon
                          name="send"
                          type="material"
                          iconStyle={{ color: "#1895b9", marginRight: 10 }}
                          size={24}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <View
          style={{
            ...styles.newRequest,

            backgroundColor: "#1895b9",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            + New prayer request
          </Text>
        </View>
      </TouchableOpacity>

      {showModal && <NewRequestModal setShowModal={setShowModal} />}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  greetings: {
    backgroundColor: "#1D2F3D",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  bitText: {
    fontSize: 30,
    color: "#ffffff",
    fontWeight: "500",
  },
  trendingView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    gap: 6,
  },
  tags: {
    backgroundColor: "#EFEFEF",
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
  },
  requestView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    marginTop: 20,
    paddingBottom: 50,
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

  newRequest: {
    position: "absolute",
    height: 70,
    width: 200,
    backgroundColor: "red",
    borderRadius: 20,
    // top: Dimensions.get("window").height / 1,
    //   left: Dimensions.get("window").width / 4,
    bottom: 60,
    right: Dimensions.get("window").width / 4,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  textInput1: {
    borderWidth: 0.2,
    borderColor: "#86939e",
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "white",
    marginTop: 10,
    paddingVertical: 10,
  },
});

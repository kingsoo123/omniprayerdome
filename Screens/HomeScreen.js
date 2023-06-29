import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon, withBadge, Avatar } from "react-native-elements";

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
];

const prayerList = [
  {
    user: "John Doe",
    time: "2h ago",
    request: `I'm expecting the fruit of womb, I want the brethren please pray along with me and conect their faith mine as I wait on God.`,
    likes: "230",
    replies: "20",
    id: 0,
  },

  {
    user: "Thomas Lin",
    time: "2h ago",
    request: `I'm expecting the fruit of womb, I want the brethren please pray along with me and conect their faith mine as I wait on God.`,
    likes: "230",
    replies: "20",
    id: 1,
  },
];

const HomeScreen = ({ navigation }) => {
  const BadgeIcon = withBadge(0)(Icon);

  return (
    <SafeAreaView style={styles.container}>
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
      <View style={styles.greetings}>
        <Text style={styles.bitText}>
          Whatsoever you touch shall be blessed
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={
            (styles.trendingView,
            { paddingHorizontal: 20, paddingVertical: 10, marginTop: 10 })
          }
        >
          <Text style={{ fontWeight: "bold" }}>Trending prayers</Text>
        </View>

        <View style={styles.trendingView}>
          {tagsPrayer.map((item) => (
            <View style={styles.tags} key={item.id}>
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
          ))}
        </View>
        <View
          style={
            (styles.trendingView,
            { paddingHorizontal: 20, paddingVertical: 10, marginTop: 10 })
          }
        >
          <Text style={{ fontWeight: "bold" }}>Requests</Text>
          {prayerList.map((prayer) => (
            <View style={styles.requestView} key={prayer.id}>
              <View style={{ flexDirection: "row" }}>
                <Avatar
                  rounded
                  avatarStyle={styles.avatar}
                  size={55}
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
                  }}
                />
              </View>
              <View style={{ marginLeft: 20, paddingRight: 30 }}>
                <Text style={styles.username}>{prayer.user}</Text>
                <Text style={styles.when}>{prayer.time}</Text>
                <Text style={styles.prayerRequest}>{prayer.request}</Text>
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

                    <Text style={{ marginLeft: 5 }}>{prayer.likes}</Text>
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

                    <Text style={{ marginLeft: 5, marginTop: 5 }}>
                      {prayer.replies}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 30,
                    }}
                  >
                    <TouchableOpacity>
                      <Icon
                        name="comment"
                        type="material-community"
                        iconStyle={{ color: "#1895b9" }}
                        size={24}
                      />
                    </TouchableOpacity>

                    <Text style={{ marginLeft: 10 }}>Prayer with me</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
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
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    marginTop: 20,
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

import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { Icon, withBadge } from "react-native-elements";

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
            <Text style={{ fontWeight: "bold", color: "#1895b9" }}>
              {item.title}
            </Text>
          </View>
        ))}
      </View>
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
});

{
  /* <View
style={{
  flexDirection: "row",
  backgroundColor: "#ffffff",
  height: 200,
  borderRadius: 10,
}}
></View> */
}

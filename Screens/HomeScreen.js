import { useEffect, useState, useCallback, Fragment } from "react";
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
  RefreshControl,
  ActivityIndicator,
  StatusBar,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Icon, withBadge, Avatar } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../firebase/firebase-config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore/lite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addNewLikesId, isLikedAction } from "../Slice/LikesSlice";
import { postTagAction } from "../Slice/NotificationSlice";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { fontSizer } from "../utils";
import NewRequestModal from "../component/NewRequestModal";
import NotificationModal from "../component/NotificationModal";

const { width, height } = Dimensions.get("window");

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
  { title: "All", id: 12 },
];

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.switch);
  const likeId = useSelector((state) => state.likes);
  const newNotification = useSelector((state) => state.notification);
  const BadgeIcon = withBadge(newNotification?.newPostArray?.length)(Icon);
  const [showModal, setShowModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [prayerData, setPrayerData] = useState([]);
  const [getPrayerUser, setGetPrayerUser] = useState("");
  const [bibleQuote, setBibleQuote] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const collectionRef = query(
    collection(db, "prayer_request"),
    orderBy("when", "desc")
  );
  const bibleQuoteCollection = collection(db, "bibleQuote");

  const [isClicked, setIsClicked] = useState(false);
  const [name, setName] = useState("");
  const [prayerComment, setPrayerComment] = useState("");

  useEffect(() => {
    const getPrayerRequest = async () => {
      const data = await getDocs(collectionRef);
      const mapData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPrayerData(mapData);
    };
    getPrayerRequest();
  }, [showModal, isClicked, likeId?.isLiked, refreshing]);

  useEffect(() => {
    const getBibleQuote = async () => {
      const data = await getDocs(bibleQuoteCollection);
      const mapBibleQuote = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBibleQuote(mapBibleQuote);
    };
    getBibleQuote();
  }, [showModal, isClicked, likeId?.isLiked]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("displayName");
        setName(value);
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  const addLikes = async (id, like) => {
    let newLike = { likes: like };
    dispatch(addNewLikesId(id));
    dispatch(isLikedAction());

    if (!likeId?.likesIdArray?.includes(id)) {
      newLike = { likes: like + 1 };
      const prayerDoc = doc(db, "prayer_request", id);
      await updateDoc(prayerDoc, newLike);
      setIsClicked(false);
    } else {
      dispatch(addNewLikesId(id));
    }
  };

  const contributePrayers = async (id, prayer, response) => {
    response.push({
      request: prayer,
      likes: 0,
      user: name,
      response_id: uuidv4(),
      when: new Date(),
    });
    const newComment = {
      responses: response,
    };

    const prayerDoc = doc(db, "prayer_request", id);
    await updateDoc(prayerDoc, newComment);
    setIsClicked(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView
        style={{
          ...styles.container,
          backgroundColor: theme.theme === "light" ? "#ffffff" : "#000000",
        }}
      >
        <StatusBar
          barStyle={theme.theme === "light" ? "dark-content" : "light-content"}
          backgroundColor={"white"}
        />
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
          <TouchableOpacity
            onPress={() => {
              setShowNotificationModal(true);
            }}
          >
            <BadgeIcon
              type="material-community"
              name="bell"
              size={35}
              color={"#1895b9"}
            />
          </TouchableOpacity>
        </View>
        <ImageBackground
          source={{
            uri: "https://cdn.pixabay.com/photo/2016/11/22/23/15/cliffs-1851113_1280.jpg",
          }}
          style={styles.greetings}
        >
          {bibleQuote?.map((quote, id) => (
            <Fragment key={id}>
              <Text style={styles.bitText}>{quote.bibleText}</Text>
              <Text style={{ color: "white" }}>({quote.bibleVerse})</Text>
            </Fragment>
          ))}
        </ImageBackground>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={
              (styles.trendingView,
              {
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginTop: 10,
                backgroundColor:
                  theme.theme === "light" ? "#ffffff" : "#000000",
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
                onPress={() => {
                  dispatch(postTagAction(item.title));
                  navigation.navigate("PrayersByTag", {
                    // data: prayerData,
                    title: item.title,
                  });
                }}
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
              All
            </Text>

            <View style={{ paddingBottom: 100 }}>
              {!prayerData ? (
                <ActivityIndicator size="small" color="#1895b9" />
              ) : (
                prayerData?.map((prayer) => (
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
                      <Text
                        style={{
                          ...styles.username,
                          color:
                            theme.theme === "light" ? "#000000" : "#ffffff",
                        }}
                      >
                        {prayer.user}
                      </Text>
                      <Text
                        style={{
                          ...styles.when,
                          color:
                            theme.theme === "light" ? "#000000" : "#ffffff",
                        }}
                      >
                        {prayer.when?.toDate()?.toDateString()}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("SinglePrayerRequestScreen", {
                            data: prayer,
                          })
                        }
                      >
                        <Text style={styles.prayerRequest}>
                          {prayer.request}
                        </Text>
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
                        <TouchableOpacity
                          onPress={() => {
                            setIsClicked(true);
                            addLikes(prayer.id, prayer.likes);
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Icon
                              name="heart"
                              type="material-community"
                              iconStyle={{ color: "#1895b9" }}
                              size={24}
                            />

                            <Text
                              style={{
                                marginLeft: 5,
                                color:
                                  theme.theme === "light"
                                    ? "#000000"
                                    : "#ffffff",
                              }}
                            >
                              {prayer.likes}
                            </Text>
                          </View>
                        </TouchableOpacity>

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
                            {prayer.responses?.length}
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
                                  theme.theme === "light"
                                    ? "#000000"
                                    : "#ffffff",
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
                            onChangeText={(text) => setPrayerComment(text)}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              setIsClicked(true);
                              contributePrayers(
                                prayer.id,
                                prayerComment,
                                prayer.responses
                              );
                              setGetPrayerUser("");
                            }}
                          >
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
                ))
              )}
            </View>
          </View>
        </ScrollView>

        <Pressable
          style={{
            ...styles.newRequest,

            backgroundColor: "#1895b9",
          }}
          onPress={() => {
            Platform.OS === "ios"
              ? setShowModal(true)
              : Platform.OS === "android"
              ? navigation.navigate("newPrayerRequest")
              : null;
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            Make a prayer request
          </Text>
        </Pressable>

        {showModal && <NewRequestModal setShowModal={setShowModal} />}
        {showNotificationModal && (
          <NotificationModal
            setShowNotificationModal={setShowNotificationModal}
          />
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    fontSize: fontSizer(width),
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
    marginTop: 20,
  },
  username: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 1,
    marginTop: 10,
  },
  when: {
    color: "gray",
    letterSpacing: 1,
    fontSize: 11,
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
    bottom: 20,
    right: Dimensions.get("window").width / 4,
    left: Dimensions.get("window").width / 4,
    justifyContent: "center",
    alignItems: "center",
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

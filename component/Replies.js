import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon, Avatar } from "react-native-elements";
import { addNewLikesId, isLikedAction } from "../Slice/LikesSlice";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../firebase/firebase-config";
import { updateDoc, doc, getDoc } from "firebase/firestore/lite";

const Replies = ({ signle, id }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.switch);
  const likeId = useSelector((state) => state.likes);
  //const commenters = signle;
  const [commenters, setCommenters] = useState(signle);
  const [isClicked, setIsClicked] = useState(false);
  // const collectionRef = collection(db, "prayer_request");

  console.log(likeId?.likesIdArray, "MMMMMMM....");

  const getAllUpdatedPrayer = (id) => {
    // console.log(signle, "PROPPSSSS....");

    const mapSingle = signle.map(({ likes, response_id, ...prayer }) => ({
      ...prayer,
      likes: id === response_id ? likes + 1 : likes,
      response_id: response_id,
    }));

    return mapSingle;
  };

  useEffect(() => {
    const getPrayer = async () => {
      try {
        console.log(id, "IDDDDDDDDDD");
        const docRef = doc(db, "prayer_request", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log(docSnap.data()?.responses, "YESSS DOCCSSSS");
          setCommenters(docSnap.data()?.responses);
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPrayer();
  }, [isClicked, signle]);

  const addLikes = async (resp_id) => {
    setIsClicked(true);
    console.log(resp_id, "PROPPSSSS....");
    dispatch(addNewLikesId(resp_id));
    dispatch(isLikedAction());
    if (!likeId?.likesIdArray?.includes(resp_id)) {
      newLike = {
        responses: getAllUpdatedPrayer(resp_id),
      };
      const prayerDoc = doc(db, "prayer_request", id);
      await updateDoc(prayerDoc, newLike);
      console.log("heheheh");
      setIsClicked(false);
    } else {
      console.log("ID USEDDDD");
      setIsClicked(false);
    }
  };

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
              // onPress={() =>
              //   navigation.navigate("SinglePrayerRequestScreen", {
              //     data: item,
              //   })
              // }
              >
                <Text style={styles.prayerRequest}>{comment?.request}</Text>
              </TouchableOpacity>

              <View
                style={{
                  width: "100%",
                  height: 20,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    console.log(
                      comment.likes,
                      comment.request,
                      comment.user,
                      comment.response_id,
                      "FROM COMP"
                    );

                    addLikes(
                      comment.response_id,
                      comment.likes,
                      comment.request,
                      comment.user
                    );
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                      name="heart"
                      type="material-community"
                      iconStyle={{ color: "#1895b9" }}
                      size={24}
                    />

                    <Text
                      style={{
                        marginLeft: 5,
                        color: theme.theme === "light" ? "#000000" : "#ffffff",
                      }}
                    >
                      {comment?.likes}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 20,
                  }}
                >
                  <Icon
                    name="content-copy"
                    type="material-community"
                    iconStyle={{ color: "#1895b9" }}
                    size={20}
                  />

                  <Text
                    style={{
                      marginLeft: 5,
                      color: theme.theme === "light" ? "#000000" : "#ffffff",
                    }}
                  >
                    copy
                  </Text>
                </View>
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 20,
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
    paddingBottom: 20,
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

// : {
//   likes: like + 1,
//   request: request,
//   response_id: resp_id,
//   user: user,
// },

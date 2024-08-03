import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useContext, useState, useCallback, useEffect } from "react";
import FooterMenu from "../components/Menus/FooterMenu";
import PostCard from "../components/PostCard";
import { PostContext } from "../../context/postContext";

const Home = () => {
  // global state
  const [posts, , getAllPosts] = useContext(PostContext); // Destructure correctly
  const [refreshing, setRefreshing] = useState(false);

  // useEffect to fetch posts on component mount
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  // refresh control
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [getAllPosts]);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PostCard posts={posts} />
        {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
      </ScrollView>
      <View>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    margin: 10,
    justifyContent: "space-between",
    backgroundColor:"white"
  },
});

export default Home;

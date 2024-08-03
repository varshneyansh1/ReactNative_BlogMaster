import React, { createContext, useState, useCallback } from "react";
import axios from "axios";

// context
const PostContext = createContext();

const PostProvider = ({ children }) => {
  // state
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  // get posts
  const getAllPosts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/post/get-all-post");
      setLoading(false);
      setPosts(data?.post);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []); // Empty dependency array ensures it is stable

  return (
    <PostContext.Provider value={[posts, setPosts, getAllPosts]}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };

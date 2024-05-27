import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setAllPosts } from "@features/postsSlice";
import "../../styles/feed.scss";
import PostCard from "@components/Posts/postCard";
import SearchBar from "@components/search/searchBar";
import LoadingPost from "@components/loading/loadingPost";

const Feed = () => {
  const posts = useSelector((state) => state.post.value.allPost);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const controller = new AbortController();
    const fetchAllRecipe = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/recipe/fetch-all",
          {
            signal: controller.signal,
          }
        );
        dispatch(setAllPosts(response.data));
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllRecipe();

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      <section className="feed-container">
        <section className="feed-banner">
          <SearchBar />
          <h2>Explore Recipes</h2>
        </section>
        {loading ? (
          <section className="posts">
            <LoadingPost />
          </section>
        ) : posts.length > 0 ? (
          <section className="posts">
            {posts.map((post, index) => {
              return (
                <section key={index} className="post-card">
                  <PostCard postInfo={post} />
                </section>
              );
            })}
          </section>
        ) : (
          <section className="no-posts">
            <h1>Sorry can't find any recipes</h1>
          </section>
        )}
      </section>
    </>
  );
};

export default Feed;

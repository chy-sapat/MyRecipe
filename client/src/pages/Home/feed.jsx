import React, { useEffect, useState } from "react";
import axios from "axios";

import { IoIosSearch } from "react-icons/io";
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from "react-icons/bi";
import { IoAddSharp } from "react-icons/io5";

import { useSelector, useDispatch } from "react-redux";
import { setAllPosts } from "@features/postsSlice";

import "../../styles/feed.scss";
// import posts from "../../dummy_data/posts.json";
import PostCard from "@components/Posts/postCard";

const Feed = () => {
  const posts = useSelector((state) => state.post.value.allPost);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllRecipe = async () => {
      const response = await axios.get(
        "http://localhost:3000/recipe/fetch-all"
      );
      dispatch(setAllPosts(response.data));
    };

    if (posts.length == 0) {
      fetchAllRecipe();
    }
  }, []);
  return (
    <>
      <section className="feed-container">
        {/* <section className="search-bar">
          <div className="search-icon">
            <IoIosSearch size="30px" />
          </div>
          <input type="text" placeholder="Search" />
        </section> */}
        <h2>For You</h2>
        <section className="posts">
          {posts.length > 0 ? (
            posts.map((post, index) => {
              return (
                <section key={index} className="post-card">
                  <PostCard postInfo={post} />
                </section>
              );
            })
          ) : (
            <section className="no-posts">
              <p>No Recipe Uploaded</p>
            </section>
          )}
        </section>
      </section>
    </>
  );
};

export default Feed;

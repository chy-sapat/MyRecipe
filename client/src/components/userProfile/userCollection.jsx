import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "@components/Posts/postCard";

const UserCollection = ({ userId }) => {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipe/fetch-save-recipe/${userId}`
        );
        setSavedPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSavedRecipe();
  }, []);
  return (
    <>
      {savedPosts.length > 0 ? (
        <section className="posts">
          {savedPosts.map((post, index) => {
            return (
              <section key={index} className="post-card">
                <PostCard postInfo={post} />
              </section>
            );
          })}
        </section>
      ) : (
        <section className="no-posts">
          <p>No Recipe Added to Collection</p>
        </section>
      )}
    </>
  );
};

export default UserCollection;

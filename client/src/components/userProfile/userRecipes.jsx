import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "@components/Posts/postCard";

const UserRecipes = ({ userId }) => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipe/fetch-user-recipe/${userId}`
        );
        setUserPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserRecipe();
  }, []);
  return (
    <>
      <h2 className="heading">My Recipes</h2>
      {userPosts.length > 0 ? (
        <section className="posts">
          {userPosts.map((post, index) => {
            return (
              <section key={index} className="post-card">
                <PostCard postInfo={post} />
              </section>
            );
          })}
        </section>
      ) : (
        <section className="no-posts">
          <p>No Recipe Uploaded</p>
        </section>
      )}
    </>
  );
};

export default UserRecipes;

import React, { useEffect, useState } from "react";
import axiosInstance from "utils/axios";
import LoadingPost from "@components/loading/loadingPost";
import PostCard from "@components/Posts/postCard";
import "@styles/toprecipes.scss";

const TopRecipe = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/recipe/fetch-top");
        setRecipeData(response.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <section className="top-recipe-container">
      <section className="heading-banner">
        <h2>Top Recipes</h2>
      </section>
      {loading ? (
        <section className="posts">
          <LoadingPost />
        </section>
      ) : recipeData.length > 0 ? (
        <section className="posts">
          {recipeData.map((post, index) => {
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
  );
};

export default TopRecipe;

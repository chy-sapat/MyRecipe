import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import "@styles/postDetails.scss";

const PostDetails = () => {
  const params = useParams();
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipe/fetch-recipe/${params.id}`
        );
        setPostData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPostData();
  }, []);
  return (
    <>
      {postData && (
        <section className="recipe-detail">
          <section className="recipe-heading">
            <section className="recipe-info">
              <h1>{postData.title}</h1>
              <p>
                By <a href="#">{postData.username}</a>
              </p>

              <section className="recipe-tags">
                <p>
                  Recipe Tags:{" "}
                  {postData.tags.map((tag, index) => {
                    return <span key={index}>{tag}</span>;
                  })}
                </p>
              </section>
            </section>
            <section className="recipe-image">
              <img
                src={`http://localhost:3000/assets/${postData.attachment}`}
                alt={`${postData.title}`}
              />
            </section>
          </section>
          <section className="recipe-body">
            <section className="recipe-description">
              <h3 className="labels">Description</h3>
              <p>{postData.description}</p>
            </section>
            <section className="recipe-ingredients">
              <h3 className="labels">Ingredients</h3>
              <ul>
                {postData.ingredients.map((ingredient, index) => {
                  return (
                    <li key={index} className="ingredient">
                      <span>{index + 1}</span>
                      <span>{ingredient}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
            <section className="recipe-directions">
              <h3 className="labels">Directions</h3>
              <ul>
                {postData.steps.map((step, index) => {
                  return (
                    <li key={index} className="step">
                      <span>{index + 1}</span>
                      <span>{step}</span>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="recipe-interactions"></section>
          </section>
        </section>
      )}
    </>
  );
};

export default PostDetails;

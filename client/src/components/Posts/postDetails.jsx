import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "@styles/postDetails.scss";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { MdOutlineReport } from "react-icons/md";
import { useGetUserDetails } from "@hooks/GetUserDetails";
import { useGetUserId } from "@hooks/GetUserId";
import Rating from "./rating";
import { setDetails } from "@features/userDetailsSlice";

const PostDetails = () => {
  const isSignedIn = useSelector((state) => state.signedIn.value);
  const params = useParams();
  const [postData, setPostData] = useState(null);
  const userId = useGetUserId();
  const userDetail = useGetUserDetails();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const DeleteRecipe = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/recipe/delete-recipe/${postData._id}`
      );
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const saveRecipe = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/recipe/save-recipe",
        {
          userId,
          recipeId: postData._id,
        }
      );
      const updatedDetail = {
        ...userDetail,
        savedRecipe: response.data.updatedSavedRecipe,
      };
      dispatch(setDetails(updatedDetail));
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromSavedRecipe = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/recipe/remove-saved-recipe",
        {
          userId,
          recipeId: postData._id,
        }
      );
      const updatedDetail = {
        ...userDetail,
        savedRecipe: response.data.updatedSavedRecipe,
      };
      dispatch(setDetails(updatedDetail));
    } catch (error) {
      console.log(error);
    }
  };

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
        <section className="recipe-detail-container">
          <section className="recipe-heading">
            <section className="recipe-info">
              {userId == postData.userId && (
                <section className="recipe-modify-option">
                  <div className="edit-icon" title="Edit">
                    <FaRegEdit size="25px" />
                  </div>
                  <div
                    className="delete-icon"
                    title="Delete"
                    onClick={DeleteRecipe}
                  >
                    <MdDeleteForever size="30px" />
                  </div>
                </section>
              )}
              <h1 className="recipe-title">{postData.title}</h1>
              <p className="recipe-author">
                <Link to={`/profile/${postData.userId}`}>
                  {postData.username}
                </Link>
              </p>
              <section className="recipe-stats">
                <section className="stat">
                  <span>{postData.ingredients.length}</span>
                  <span className="stat-label">Ingredients</span>
                </section>
                <section className="stat">
                  <span>
                    {postData.cookingTime.cookingHr > 0 &&
                      `${postData.cookingTime.cookingHr} hr`}
                    {postData.cookingTime.cookingMin > 0 &&
                      `${postData.cookingTime.cookingMin} min`}
                    {!postData.cookingTime.cookingHr > 0 &&
                      !postData.cookingTime.cookingMin > 0 &&
                      "N/A"}
                  </span>
                  <span className="stat-label">Time</span>
                </section>
                <section className="stat">
                  <span>{postData.skill ? postData.skill : "N/A"}</span>
                  <span className="stat-label">Skill</span>
                </section>
              </section>
              {isSignedIn && userId != postData.userId && (
                <section className="recipe-options">
                  {userDetail.savedRecipe.includes(postData._id) ? (
                    <section className="option" onClick={removeFromSavedRecipe}>
                      <div className="icon">
                        <IoRemoveCircleOutline size="18px" />
                      </div>
                      <span>Remove from Collection</span>
                    </section>
                  ) : (
                    <section className="option" onClick={saveRecipe}>
                      <div className="icon">
                        <IoAddCircleOutline size="18px" />
                      </div>
                      <span>Add to Collection</span>
                    </section>
                  )}
                  <section className="option exception">
                    <div className="icon">
                      <MdOutlineReport size="18px" />
                    </div>
                    <span>Report</span>
                  </section>
                </section>
              )}
            </section>
            <section className="recipe-image">
              <img
                src={`http://localhost:3000/assets/${postData.attachment}`}
                alt={`${postData.title}`}
              />
            </section>
            <section className="recipe-option">
              <div className="option-icon"></div>
              <section className="option-menu"></section>
            </section>
          </section>
          <section className="recipe-body">
            {postData.description && (
              <section className="recipe-description">
                <h3 className="labels">Description</h3>
                <p>{postData.description}</p>
              </section>
            )}
            <section className="recipe-ingredients">
              <h3 className="labels">Ingredients</h3>
              <ul className="recipe-ingredients-list">
                {postData.ingredients.map((ingredient, index) => {
                  return (
                    <li key={index} className="ingredient">
                      <span className="numbering">{index + 1}</span>
                      <p className="info">{ingredient}</p>
                    </li>
                  );
                })}
              </ul>
            </section>
            <section className="recipe-directions">
              <h3 className="labels">Directions</h3>
              <ul className="recipe-directions-list">
                {postData.steps.map((step, index) => {
                  return (
                    <li key={index} className="step">
                      <span className="numbering">{index + 1}</span>
                      <p className="info">{step}</p>
                    </li>
                  );
                })}
              </ul>
            </section>
            <section className="recipe-tags">
              <h3 className="labels">Tags</h3>
              <ul className="recipe-tag-list">
                {postData.tags.map((tag, index) => {
                  return (
                    <li
                      key={index}
                      className="recipe-tag"
                      onClick={() => navigate(`/search/${tag}`)}
                    >
                      {tag}
                    </li>
                  );
                })}
              </ul>
            </section>
            <Rating
              recipeId={postData._id}
              ownerId={postData.userId}
              ratingData={postData.ratings}
              avgRating={postData.avgRating}
              setPostData={setPostData}
            />
          </section>
        </section>
      )}
    </>
  );
};

export default PostDetails;

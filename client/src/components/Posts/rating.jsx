import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useGetUserDetails } from "@hooks/GetUserDetails";
import { useGetUserId } from "@hooks/GetUserId";
import { useSelector } from "react-redux";

import { IoMdStarOutline, IoMdStar } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";
import StarDisplay from "@components/star_rating/starDisplay";

const Rating = ({ recipeId, ownerId, ratingData, avgRating, setPostData }) => {
  const rating = useRef(0);
  const commentRef = useRef(null);
  const isSignedIn = useSelector((state) => state.signedIn.value);
  const userId = useGetUserId();
  const userDetail = useGetUserDetails();
  const [starRating, setStarRating] = useState(Array(5).fill(false));
  const [commentActive, setCommentActive] = useState(false);
  const [myRating, setMyRating] = useState(null);
  const [othersRatings, setOthersRatings] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const ratingTitle = ["Bad", "Okay", "Good", "Better", "Best"];
  const totalRating = ratingData.length;

  const handleStarRating = (index) => {
    const newRating = Array(5).fill(false);
    newRating.fill(true, 0, index + 1);
    setStarRating(newRating);
    rating.current = index + 1;
  };
  const activateComment = () => {
    !commentActive && setCommentActive(!commentActive);
  };

  const deactivateComment = () => {
    setCommentActive(!commentActive);
    editMode && setEditMode(false);
  };

  const handleRatingEdit = () => {
    setEditMode(true);
    setCommentActive(true);
  };

  const deleteRating = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/recipe/delete-rating/${recipeId}`,
        {
          ratingId: myRating._id,
        }
      );
      setMyRating(null);
      setPostData(response.data);
      setEditMode(true);
      setStarRating(Array(5).fill(false));
      rating.current = 0;
    } catch (error) {
      console.log(error.message);
    }
  };

  const PostRating = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/recipe/rating/${recipeId}`,
        {
          userId: userId,
          username: userDetail.name,
          userImage: userDetail.picturePath,
          rating: rating.current,
          comment: commentRef.current.value,
        }
      );
      setPostData(response.data);
      setMyRating(
        response.data.ratings.find((rating) => rating.userId == userId)
      );
      setCommentActive(!commentActive);
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getMyRating = () => {
      const myRate = ratingData.find((rating) => rating.userId == userId);
      if (myRate && isSignedIn) {
        setMyRating(myRate);
        rating.current = myRate.rating;
        const newStars = Array(5).fill(false);
        newStars.fill(true, 0, myRate.rating);
        setStarRating(newStars);
        setOthersRatings(ratingData.filter((rt) => rt.userId != myRate.userId));
      } else {
        setEditMode(true);
        setOthersRatings(ratingData);
      }
    };
    getMyRating();
  }, []);

  return (
    <>
      <section className="recipe-interactions">
        <h3 className="labels">Reviews</h3>
        <section className="aggregate-ratings">
          <p>Total Reviews ({ratingData.length})</p>
          <StarDisplay avgRating={avgRating} />
        </section>
        {isSignedIn &&
          ownerId != userId &&
          (editMode ? (
            <section className="recipe-rating recipe-rating-input">
              <section className="profile-image">
                <img
                  src={`http://localhost:3000/assets/${userDetail.picturePath}`}
                />
              </section>
              <section className="rating">
                {commentActive && (
                  <>
                    <p className="username">{userDetail.name}</p>
                    <section className="star-rating">
                      {starRating.map((rating, index) => {
                        return (
                          <div
                            key={index}
                            className="star-input"
                            title={ratingTitle[index]}
                            onClick={() => handleStarRating(index)}
                          >
                            {rating ? (
                              <IoMdStar size="25px" />
                            ) : (
                              <IoMdStarOutline size="25px" />
                            )}
                          </div>
                        );
                      })}
                    </section>
                  </>
                )}
                <textarea
                  className="comment-input-field"
                  cols="30"
                  rows="3"
                  placeholder="Write your review here"
                  ref={commentRef}
                  defaultValue={myRating ? myRating.comment : null}
                  onFocus={activateComment}
                ></textarea>
                {commentActive && (
                  <section className="submit-cancel-wrapper">
                    <button
                      className="comment-btn"
                      onClick={() => PostRating()}
                    >
                      Submit
                    </button>
                    <span
                      className="cancel-btn"
                      onClick={() => deactivateComment()}
                    >
                      Cancel
                    </span>
                  </section>
                )}
              </section>
            </section>
          ) : (
            myRating && (
              <section className="my-Rating recipe-rating">
                <section className="profile-image">
                  <img
                    src={`http://localhost:3000/assets/${myRating.userImage}`}
                    alt="Profile Image"
                  />
                </section>
                <section className="rating">
                  <p className="username">{myRating.username}</p>
                  <section className="star-rating">
                    {starRating.map((star, index) => {
                      return (
                        <div key={index} className="star-display">
                          {index <= myRating.rating - 1 ? (
                            <IoMdStar size="25px" />
                          ) : (
                            <IoMdStarOutline size="25px" />
                          )}
                        </div>
                      );
                    })}
                  </section>
                  <p className="comment-display">{myRating.comment}</p>
                </section>
                <section className="rating-option">
                  <MdEdit
                    size="25px"
                    className="edit-icon"
                    onClick={handleRatingEdit}
                    title="Edit Rating"
                  />
                  <MdDelete
                    size="25px"
                    className="delete-icon"
                    title="Delete Rating"
                    onClick={deleteRating}
                  />
                </section>
              </section>
            )
          ))}
      </section>
      {othersRatings && (
        <section className="rating-display">
          {othersRatings.map((review, index) => {
            return (
              <section key={review._id} className="recipe-rating">
                <section className="profile-image">
                  <img
                    src={`http://localhost:3000/assets/${review.userImage}`}
                    alt=""
                  />
                </section>
                <section className="rating">
                  <p className="username">{review.username}</p>
                  <section className="star-rating">
                    {starRating.map((star, index) => {
                      return (
                        <div key={index} className="star-display">
                          {index <= review.rating - 1 ? (
                            <IoMdStar size="25px" />
                          ) : (
                            <IoMdStarOutline size="25px" />
                          )}
                        </div>
                      );
                    })}
                  </section>
                  <p className="comment-display">{review.comment}</p>
                </section>
              </section>
            );
          })}
        </section>
      )}
    </>
  );
};

export default Rating;

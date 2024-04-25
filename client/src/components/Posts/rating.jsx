import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useGetUserDetails } from "@hooks/GetUserDetails";
import { useGetUserId } from "@hooks/GetUserId";
import { useSelector } from "react-redux";

import { IoMdStarOutline, IoMdStar } from "react-icons/io";
import StarDisplay from "@components/star_rating/starDisplay";

const Rating = ({ recipeId, ownerId, ratingData, avgRating, setPostData }) => {
  const rating = useRef(0);
  const commentRef = useRef(null);
  const isSignedIn = useSelector((state) => state.signedIn.value);
  const userId = useGetUserId();
  const userDetail = useGetUserDetails();
  const [starRating, setStarRating] = useState(Array(5).fill(false));
  const [commentActive, setCommentActive] = useState(false);
  const ratingTitle = ["Bad", "Not Good", "Good", "Better", "Best"];
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
    setStarRating(Array(5).fill(false));
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
          newAvg: (avgRating + rating.current) / (totalRating + 1),
        }
      );
      setPostData(response.data);
      rating.current = 0;
      comment.current.value = "";
      setCommentActive(!commentActive);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className="recipe-interactions">
        <h3 className="labels">Reviews</h3>
        <section className="aggregate-ratings">
          <p>Total Reviews ({ratingData.length})</p>
          <StarDisplay avgRating={avgRating} />
        </section>
        {isSignedIn && ownerId != userId && (
          <section className="recipe-rating">
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
                onFocus={activateComment}
              ></textarea>
              {commentActive && (
                <section className="submit-cancel-wrapper">
                  <button className="comment-btn" onClick={() => PostRating()}>
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
        )}
      </section>
      <section className="rating-display">
        {ratingData.map((review, index) => {
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
    </>
  );
};

export default Rating;

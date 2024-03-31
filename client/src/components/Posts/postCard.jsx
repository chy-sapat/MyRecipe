import React, { useState } from "react";
import { Link } from "react-router-dom";
import "@styles/postCard.scss";
import StarDisplay from "@components/star_rating/starDisplay";

const PostCard = ({ postInfo }) => {
  return (
    <>
      <section className="post-images">
        <p className="post-description">{postInfo.description}</p>
        <Link to={`/recipe/${postInfo._id}`} className="post-title">
          <img
            src={`http://localhost:3000/assets/${postInfo.attachment[0]}`}
            alt="Post Image"
          />
        </Link>
      </section>
      <section className="post-body">
        <section className="post-heading">
          <Link
            to={`/recipe/${postInfo._id}`}
            className="post-title"
            title={postInfo.title}
          >
            {postInfo.title}
          </Link>
        </section>
        <p className="post-author">
          <Link to={`/profile/${postInfo.userId}`}>{postInfo.username}</Link>
        </p>
        {postInfo.avgRating > 0 && (
          <section className="recipe-rating">
            <StarDisplay avgRating={postInfo.avgRating} />
          </section>
        )}
      </section>
    </>
  );
};

export default PostCard;

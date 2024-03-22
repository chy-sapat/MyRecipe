import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import postImg from "../../assets/post_img.jpeg";

const PostCard = ({ postInfo }) => {
  const [isPostOptionOpen, setIsPostOptionOpen] = useState(false);
  const openPostOptionMenu = (index) => {
    setIsPostOptionOpen(!isPostOptionOpen);
  };
  return (
    <>
      <section className="post-images">
        <img
          src={`http://localhost:3000/assets/${postInfo.attachment[0]}`}
          alt="Post Image"
        />
        <p className="post-description">{postInfo.description}</p>
      </section>
      <section className="post-body">
        <section className="post-heading">
          <Link to={`/recipe/${postInfo._id}`} className="post-title">
            {postInfo.title}
          </Link>
          {/* <section className="post-tags">
            {postInfo.tags.map((tag, index) => {
              return <p className="post-tag">{tag}</p>;
            })}
          </section> */}
          {/* <div className="option-icon" onClick={(e) => openPostOptionMenu()}>
            <BsThreeDotsVertical size="20px" />
          </div>
          <ul className="post-options-menu" aria-expanded={isPostOptionOpen}>
            <li className="post-option">Report</li>
          </ul> */}
        </section>
        <p className="post-author">
          By <a href="#">{postInfo.username}</a>
        </p>
      </section>
    </>
  );
};

export default PostCard;

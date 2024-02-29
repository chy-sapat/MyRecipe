import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoAddSharp } from "react-icons/io5";

import "../../styles/feed.scss";
import posts from "../../dummy_data/posts.json";
import postImg from "../../assets/post_img.jpeg";

const Feed = () => {
  const [isPostOptionOpen, setIsPostOptionOpen] = useState(
    Array(20).fill(false)
  );
  const openPostOptionMenu = (index) => {
    const updatedOptions = [...isPostOptionOpen];
    updatedOptions[index] = !updatedOptions[index];
    setIsPostOptionOpen(updatedOptions);
  };
  return (
    <>
      <section className="feed-container">
        <section className="search-bar">
          <div className="search-icon">
            <IoIosSearch size="30px" />
          </div>
          <input type="text" placeholder="Search" />
        </section>
        <h2>For You</h2>
        <section className="posts">
          {posts.map((post, index) => {
            return (
              <section key={index} className="post-card">
                <section className="post-images">
                  <img src={postImg} alt="Post Image" />
                </section>
                <section className="post-heading">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-category">{post.category}</p>
                  <div
                    className="option-icon"
                    onClick={(e) => openPostOptionMenu(index)}
                  >
                    <BsThreeDotsVertical size="20px" />
                  </div>
                  <ul
                    className="post-options-menu"
                    aria-expanded={isPostOptionOpen[index]}
                  >
                    <li className="post-option">Report</li>
                  </ul>
                </section>
                <p className="post-author">
                  By <a href="#">{post.username}</a>
                </p>
                <p className="post-description">{post.description}</p>
                {/* <section className="post-card-information">
                  <section className="ingredients-no">
                    <span className="info-title">Ingredients</span>
                    <span className="value">{post.ingredients}</span>
                  </section>
                  <section className="time">
                    <span className="info-title">Time</span>
                    <span className="value">{post.time}</span>
                  </section>
                  <section className="skill">
                    <span className="info-title">Skill</span>
                    <span className="value">{post.skill_level}</span>
                  </section>
                </section> */}
              </section>
            );
          })}
        </section>
      </section>
    </>
  );
};

export default Feed;

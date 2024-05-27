import React from "react";
import { IoMdStar } from "react-icons/io";
import "@styles/postloading.scss";

const LoadingPost = () => {
  const postTemplates = Array(6).fill("");
  const starTemplates = Array(5).fill("");
  return (
    <>
      {postTemplates.map((val, index) => {
        return (
          <section key={index} className="loading-post-card">
            <section className="loading-post-image"></section>
            <section className="loading-post-body">
              <p className="loading-post-title"></p>
              <p className="loading-post-author"></p>
              <section className="loading-post-ratings">
                {starTemplates.map((val, index) => {
                  return (
                    <section key={index} className="star">
                      <IoMdStar size="25px" />
                    </section>
                  );
                })}
              </section>
            </section>
          </section>
        );
      })}
    </>
  );
};

export default LoadingPost;

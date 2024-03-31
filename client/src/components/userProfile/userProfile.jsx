import React, { useEffect, useState } from "react";

import "@styles/userProfile.scss";
import { useGetUserDetails } from "@hooks/GetUserDetails";
import { useGetUserId } from "@hooks/GetUserId";
import PostCard from "@components/Posts/postCard";

const UserProfileInfo = ({ userData }) => {
  const userId = useGetUserId();

  return (
    <>
      <section className="userprofile-info">
        <section className="userprofile-image">
          <img
            src={`http://localhost:3000/assets/${userData.picturePath}`}
            alt=""
          />
        </section>
        <section className="user-info">
          <p className="name">{userData.name}</p>
          <p className="username">{userData.username}</p>
          <p className="profile-description">{userData.description}</p>
          {/* <section className="followers">
            <p>Followers {userData.followers.length}</p>
            <p>Following {userData.followed.length}</p>
          </section>
          <section className="actions">
            {userData.followers.includes(userId) ? (
              <button>Follow</button>
            ) : (
              <button>Follow</button>
            )}
          </section> */}
        </section>
      </section>
    </>
  );
};

export default UserProfileInfo;

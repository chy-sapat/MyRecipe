import React, { useState } from "react";
import "@styles/userProfile.scss";

const UserProfileInfo = ({ userData }) => {
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
          <section className="description">{userData.description}</section>
        </section>
      </section>
    </>
  );
};

export default UserProfileInfo;

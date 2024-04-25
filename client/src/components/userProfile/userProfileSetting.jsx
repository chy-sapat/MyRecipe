import { useGetUserId } from "@hooks/GetUserId";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDetails } from "@features/userDetailsSlice";

const UserProfileSetting = ({ userData }) => {
  const [name, setName] = useState(userData.name);
  const [username, setUsername] = useState(userData.username);
  const [description, setDescription] = useState(userData.descripiton);
  const [newProfileImage, setProfileImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState(userData.email);
  const [changedData, setChangedData] = useState({});
  const [userInfoChange, setUserInfoChange] = useState(false);
  const oldPassword = useRef(null);
  const newPassword = useRef(null);
  const confirmPassword = useRef(null);
  const [isChangePasswordActive, setChangePasswordActive] = useState(false);
  const userId = useGetUserId();
  const dispatch = useDispatch();
  const isEmailChanged = email != userData.email;

  const handleImage = (e) => {
    setProfileImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };
  const handleNameChange = (e) => {
    !userInfoChange && setUserInfoChange(true);
    setChangedData();
  };
  const handleUsernameChange = (e) => {
    !userInfoChange && setUserInfoChange(true);
    setUsername(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    !userInfoChange && setUserInfoChange(true);
    setDescription(e.target.value);
  };
  const handlePersonalInfoChange = async (e) => {
    e.preventDefault();
    const newUserData = {
      name: name,
      username: username,
      description: description,
    };
    try {
      const response = await axios.patch(
        `http://localhost:3000/auth/user-info/${userId}`,
        {
          update: newUserData,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setImageUrl(`http://localhost:3000/assets/${userData.picturePath}`);
  }, []);
  return (
    <>
      <h2 className="heading">Settings</h2>
      <section className="general-setting">
        <h3 className="heading-secondary">General Setting</h3>
        <form onSubmit={handlePersonalInfoChange}>
          <section className="setting-option-grp image-setting">
            <img src={imageUrl} alt="" className="profile-image-preview" />
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              onChange={handleImage}
            />
            <span>Edit</span>
          </section>
          <section className="setting-option-grp">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="setting-input"
              defaultValue={name}
              onChange={handleNameChange}
            />
          </section>
          <section className="setting-option-grp">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="setting-input"
              defaultValue={username}
              onChange={handleUsernameChange}
            />
          </section>
          <section className="setting-option-grp">
            <label htmlFor="descripiton">Description</label>
            <textarea
              id="description"
              cols="30"
              rows="3"
              className="setting-input"
              defaultValue={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </section>
          <section className="action-btns">
            {userInfoChange && (
              <button type="submit" className="btn-green">
                Update
              </button>
            )}
          </section>
        </form>
      </section>
      <section className="account-setting">
        <h3 className="heading-secondary">Account Setting</h3>
        <section className="setting-option-grp">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="setting-input"
            defaultValue={userData.email}
          />
          <button className="btn-green">Change</button>
        </section>
        <section className="setting-option-grp">
          <label htmlFor="password">Change Password</label>
          {!isChangePasswordActive && (
            <button
              className="btn-green"
              onClick={() => setChangePasswordActive(true)}
            >
              Change
            </button>
          )}
        </section>
        {isChangePasswordActive && (
          <section className="password-change-setting">
            <section className="setting-option-grp">
              <label htmlFor="old-password">Old Password</label>
              <input type="text" id="old-password" className="setting-input" />
            </section>
            <section className="setting-option-grp">
              <label htmlFor="new-password">New Password</label>
              <input type="text" id="new-password" className="setting-input" />
            </section>
            <section className="setting-option-grp">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="text"
                id="confirm-password"
                className="setting-input"
              />
            </section>
            <section className="action-btns">
              <button className="btn-green">Change</button>
              <button
                className="btn-red"
                onClick={() => setChangePasswordActive(false)}
              >
                Cancel
              </button>
            </section>
          </section>
        )}
        <section className="setting-option-grp">
          <label htmlFor="delete-btn">Delete Account</label>
          <button className="btn-red">Delete</button>
        </section>
      </section>
    </>
  );
};

export default UserProfileSetting;

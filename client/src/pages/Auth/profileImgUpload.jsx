import React, { useState } from "react";
import Logo from "@components/logo";
import "@styles/uploadProfileImage.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetUserId } from "@hooks/GetUserId";

const ProfileImgUpload = () => {
  const [img, setImg] = useState("");
  const [imgURL, setImgURL] = useState("");
  const userId = useGetUserId();
  const navigate = useNavigate();
  const handleFile = (e) => {
    setImg(e.target.files[0]);
    setImgURL(URL.createObjectURL(e.target.files[0]));
  };
  const upload = async (e) => {
    e.preventDefault();
    const imgData = new FormData();
    imgData.append("userId", userId);
    imgData.append("image", img);
    console.log(imgData);
    try {
      const response = await axios.post(
        "http://localhost:3000/uploads/profile-image",
        imgData
      );
      navigate("/auth", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="upload-image-container">
        <div className="upload-image-wrapper">
          <div className="heading">
            <Logo />
            <p className="skip-link" onClick={() => navigate("/auth")}>
              Skip
            </p>
          </div>
          <h2>Upload Profile Picture</h2>
          <form onSubmit={(e) => upload(e)}>
            <div className="img-preview-container">
              <input type="file" onChange={(e) => handleFile(e)} />
              {imgURL ? (
                <img src={imgURL} />
              ) : (
                <p>Click here to upload image</p>
              )}
            </div>
            <button>Upload image</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileImgUpload;

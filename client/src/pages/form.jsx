import React, { useState } from "react";
import Logo from "../components/logo";
import "../styles/form.scss";
import defaultPic from "../assets/defaultprofile.jpg";
const form = () => {
  const [imgURL, setImgURL] = useState(defaultPic);
  const handleFile = (e) => {
    setImgURL(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <section className="form-container">
      <header>
        <Logo />
      </header>
      <section className="user-detail-container">
        <form className="user-detail">
          <h2>Personal Information</h2>
          <section className="form-group">
            <div className="imgPreview">
              <input
                type="file"
                id="profilepic"
                onChange={(e) => handleFile(e)}
              />
              <img src={imgURL} />
            </div>
          </section>
          <section className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required />
          </section>
          <section className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required />
          </section>
          <section className="form-group">
            <textarea
              id="describe"
              placeholder="Tell something about yourself"
              rows={2}
              cols={20}
            />
          </section>
          <button className="sign-up">CONTINUE</button>
          <p>back</p>
        </form>
      </section>
    </section>
  );
};

export default form;

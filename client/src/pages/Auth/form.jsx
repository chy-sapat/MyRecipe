import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Logo from "@components/logo";
import "@styles/form.scss";
import axios from "axios";
import { useCookies } from "react-cookie";
import { removeDetails } from "@features/userDetailsSlice";

const CreateAccountForm = () => {
  const userDetails = useSelector((state) => state.userDetail.value);
  const name = useRef("");
  const username = useRef("");
  const description = useRef("");
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies("access_token");
  const dispatch = useDispatch();
  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        email: userDetails.email,
        password: userDetails.password,
        name: name.current,
        username: username.current,
        description: description.current,
      });
      if (response.status == 200) {
        const res = await axios.post("http://localhost:3000/auth/login", {
          email: userDetails.email,
          password: userDetails.password,
        });
        setCookie("access_token", res.data.token, {
          sameSite: "none",
          secure: true,
        });
        window.localStorage.setItem(response.data.userId);
        dispatch(removeDetails());
        navigate("/create-profile/upload-profile-image");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="form-container">
      <header>
        <Logo />
      </header>
      <section className="user-detail-container">
        <form onSubmit={(e) => register(e)} className="user-detail">
          <h2>Personal Information</h2>
          {/* <section className="form-group">
            <div className="imgPreview">
              <input
                type="file"
                id="profilepic"
                onChange={(e) => handleFile(e)}
              />
              <img src={imgURL} />
            </div>
          </section> */}
          <section className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={(e) => (name.current = e.target.value)}
              required
            />
          </section>
          <section className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={(e) => (username.current = e.target.value)}
              required
            />
          </section>
          <section className="form-group">
            <textarea
              id="describe"
              placeholder="Tell something about yourself"
              rows={2}
              cols={10}
              onChange={(e) => (description.current = e.target.value)}
            />
          </section>
          <button type="submit" className="sign-up">
            CONTINUE
          </button>
        </form>
      </section>
    </section>
  );
};

export default CreateAccountForm;

import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/logo";
import { BiShow, BiHide } from "react-icons/bi";
import "../styles/login.scss";
import { useRef, useState } from "react";

const Login = ({ activeForm, setActiveForm }) => {
  const email = useRef("");
  const password = useRef("");
  const [passwordVisiblity, setPasswordVisibility] = useState(false);
  const [passwordFieldType, setPasswordFieldType] = useState("password");

  const togglePasswordVisibility = () => {
    if (passwordFieldType == "password") {
      setPasswordFieldType("text");
    } else {
      setPasswordFieldType("password");
    }
    setPasswordVisibility(!passwordVisiblity);
  };

  const login = (e) => {
    e.preventDefault();
    console.log(`email: ${email.current}\npassword: ${password.current}`);
  };
  return (
    <>
      <div className={`login-form-container`} aria-expanded={activeForm}>
        <header>
          <Logo />
          <button
            className="signup-btn"
            onClick={() => setActiveForm(!activeForm)}
          >
            SIGN UP
          </button>
        </header>
        <form className="login-form" onSubmit={login}>
          <h2>Sign In</h2>
          <section className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              onChange={(e) => (email.current = e.target.value)}
              required
            />
          </section>
          <section className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={passwordFieldType}
              id="password"
              onChange={(e) => (password.current = e.target.value)}
              required
            />
            <div
              className="show-hide-icon"
              onClick={togglePasswordVisibility}
              title="show/hide password"
            >
              {passwordVisiblity ? (
                <BiHide size="22px" />
              ) : (
                <BiShow size="22px" />
              )}
            </div>
          </section>
          <button type="submit" className="signin-btn">
            SIGN IN
          </button>
          <span>Forgot Password</span>
          <p className="signup-link-responsive">
            Don't have an account?{" "}
            <span
              className="signup-link"
              onClick={() => setActiveForm(!activeForm)}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;

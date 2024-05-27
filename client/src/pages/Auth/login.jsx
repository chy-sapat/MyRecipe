import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import Logo from "../../components/logo";
import { BiShow, BiHide } from "react-icons/bi";
import "../../styles/login.scss";
import Spinner from "../../components/loadingSpinner";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordVisiblity, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies("access_token");

  const togglePasswordVisibility = () => {
    if (!passwordVisiblity) {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
    setPasswordVisibility(!passwordVisiblity);
  };

  const login = async (e) => {
    e.preventDefault();
    if (emailError) {
      setEmailError(!emailError);
    }
    if (passwordError) {
      setPasswordError(!passwordError);
    }
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      const { token, userId } = response.data;
      setCookie("access_token", token, {
        path: "/",
        sameSite: "None",
        secure: true,
      });
      window.localStorage.setItem("userId", userId);
      navigate("/", { replace: true });
    } catch (err) {
      if (err.response.status == 404) {
        setEmailError(true);
      } else if (err.response.status == 403) {
        setPasswordError(true);
      } else {
        console.log("Something is wrong. Please Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`login-form-container`}>
        <header>
          <Logo />
          <button
            className="signup-btn"
            onClick={() => navigate("/auth/signup")}
          >
            SIGN UP
          </button>
        </header>
        <form className="login-form" onSubmit={login}>
          <h2>Sign In</h2>
          <section className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" ref={emailRef} required />
            {emailError && (
              <p className="errorMsg">Incorrect email address. Try again.</p>
            )}
          </section>
          <section className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={passwordRef} required />
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
            {passwordError && (
              <p className="errorMsg">Incorrect password. Try again.</p>
            )}
          </section>
          <button
            type="submit"
            className="signin-btn"
            onClick={(e) => e.currentTarget.blur()}
            disabled={loading}
          >
            {!loading ? "SIGN IN" : <Spinner size="20px" />}
          </button>
          <p className="signup-link-responsive">
            Don't have an account?{" "}
            <span
              className="signup-link"
              onClick={() => navigate("/auth/signup")}
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

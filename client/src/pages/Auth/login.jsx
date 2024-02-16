import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/logo";
import { BiShow, BiHide } from "react-icons/bi";
import "../../styles/login.scss";
import { useRef, useState, useEffect } from "react";
import Spinner from "../../components/loadingSpinner";

const Login = () => {
  const email = useRef("");
  const password = useRef("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordVisiblity, setPasswordVisibility] = useState(false);
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const data = {
    email: "sapat@test.com",
    password: "kathFord@0123",
  };

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
    setLoading(true);
    if (emailError) {
      setEmailError(!emailError);
    }
    if (passwordError) {
      setPasswordError(!passwordError);
    }
    setTimeout(() => {
      if (email.current == data.email) {
        if (password.current == data.password) {
          console.log("Logged In");
          navigate("/", { replace: true });
        } else {
          setPasswordError(!passwordError);
          console.log(`Password Error: ${passwordError}`);
        }
      } else {
        setEmailError(!emailError);
      }
      setLoading(false);
    }, 3000);
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
            <input
              type="text"
              id="email"
              onChange={(e) => (email.current = e.target.value)}
              required
            />
            {emailError && (
              <p className="errorMsg">Incorrect email address. Try again.</p>
            )}
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
            {passwordError && (
              <p className="errorMsg">Incorrect password. Try again.</p>
            )}
          </section>
          <button
            type="submit"
            className="signin-btn"
            onClick={(e) => e.currentTarget.blur()}
          >
            {!loading ? "SIGN IN" : <Spinner size="20px" />}
          </button>
          <span>Forgot Password</span>
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

import { Link } from "react-router-dom";
import Logo from "../components/logo";
import { BiShow, BiHide } from "react-icons/bi";
import picOne from "../assets/pic1.jpeg";
import picTwo from "../assets/pic2.jpeg";
import picThree from "../assets/pic3.jpeg";
import "../styles/login.scss";
import { useRef, useState } from "react";

const Login = () => {
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
      <div className="auth-container">
        <section className="login-form-container">
          <header>
            <Logo />
            <button className="signup-btn">SIGN UP</button>
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
            <Link to="/">Forgot Password</Link>
            <p className="signup-link-responsive">
              Don't have an account? <a href="#">Sign up</a>
            </p>
          </form>
        </section>
        <section className="bg-image">
          <section className="slogan">
            <p className="title">Discover and Share Irresistible Recipes</p>
            <p className="subtitle">
              Unleash Your Culinary Creativity with Our Global Community.
            </p>
          </section>
          <section className="img-collage">
            <img src={picThree} />
            <img src={picTwo} />
            <img src={picOne} />
          </section>
        </section>
      </div>
    </>
  );
};

export default Login;

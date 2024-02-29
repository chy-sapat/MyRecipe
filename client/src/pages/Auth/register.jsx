import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import { useSelector, useDispatch } from "react-redux";

import { BiShow, BiHide, BiArrowBack } from "react-icons/bi";
import Logo from "../../components/logo";
import { setDetails } from "@features/userDetailsSlice";
import "../../styles/register.scss";
const Register = () => {
  const [activePage, setActivePage] = useState("first");
  const [email, setEmail] = useState("");
  const password = useRef("");
  const [emailValidation, setEmailValidation] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nextPage = () => {
    dispatch(setDetails({ email, password: password.current }));
    navigate("/create-profile");
  };

  return (
    <>
      {emailValidation && (
        <EmailVerificationModal
          email={email}
          emailValidation={emailValidation}
          setEmailValidation={setEmailValidation}
          setActivePage={setActivePage}
        />
      )}
      <div className="signup-form-container">
        {activePage == "first" && (
          <>
            <header>
              <Logo />
              <button
                className="signin-btn"
                onClick={() => {
                  navigate("/auth");
                }}
              >
                SIGN IN
              </button>
            </header>
            <PageOne
              emailValidation={emailValidation}
              setEmailValidation={setEmailValidation}
              email={email}
              setEmail={setEmail}
            />
          </>
        )}
        {activePage == "second" && (
          <PageTwo
            passwordRef={password}
            setActivePage={setActivePage}
            nextPage={nextPage}
          />
        )}
      </div>
    </>
  );
};

export default Register;

//Email
const PageOne = ({ emailValidation, setEmailValidation, email, setEmail }) => {
  const [emailStatus, setEmailStatus] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    if (emailStatus) {
      setEmailStatus("");
    }
    setEmail(e.target.value);
  };
  const next = (e) => {
    e.preventDefault();
    if (validator.isEmail(email)) {
      setEmailValidation(!emailValidation);
    } else {
      setEmailStatus("invalid");
      console.log("Invalid Email");
    }
  };
  return (
    <>
      <form className="signup-form" onSubmit={(e) => next(e)}>
        <h2>Sign Up</h2>
        <section className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className={`${emailStatus}-email`}
            value={email}
            onChange={(e) => handleChange(e)}
            required
          />
          {emailStatus && (
            <p className="errorMsg">Please enter a valid email address.</p>
          )}
        </section>
        <button className="signup-button" type="submit">
          SIGN UP
        </button>
        <p className="signin-link-responsive">
          Already Have an Account?{" "}
          <span className="signin-link" onClick={() => navigate("/auth")}>
            Sign In
          </span>
        </p>
        <p className="terms-condition-sentence">
          By signing up I agree to all Terms and Conditions and Pivacy Policy.
        </p>
      </form>
    </>
  );
};

//OTP validation
const EmailVerificationModal = ({
  email,
  emailValidation,
  setEmailValidation,
  setActivePage,
}) => {
  const otp = "2468";
  const otpValue = useRef(["", "", "", ""]);
  const [otpStatus, setOtpStatus] = useState("");
  const inputRef = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const next = (index) => {
    if (index < inputRef.length - 1) {
      inputRef[index + 1].current.focus();
    } else {
      const finalOtp = otpValue.current.join("");
      if (finalOtp == otp) {
        changePage("second");
      } else {
        setOtpStatus("invalid");
      }
    }
  };
  const changePage = (page) => {
    setActivePage(page);
    setEmailValidation(!emailValidation);
  };
  const previous = (index) => {
    if (index > 0) {
      inputRef[index - 1].current.focus();
    }
    if (otpStatus) {
      setOtpStatus("");
    }
  };
  const handleChange = (e, index) => {
    const { value } = e.target;

    otpValue.current[index] = value;
    //shift focus based on value of input field
    if (value) {
      next(index);
    } else {
      previous(index);
    }
    otpValue.current[index] = value;
  };
  useEffect(() => {
    inputRef[0].current.focus();
  }, []);
  return (
    <>
      <div className="email-verification-modal-container">
        <div className="email-verification-wrapper">
          <h2 className="heading">Verify Email</h2>
          <p className="descriptive-text">
            We have sent a verification code to {email}
          </p>
          <section className="otp-container">
            {[...Array(4)].map((_, index) => {
              return (
                <input
                  key={index}
                  ref={inputRef[index]}
                  className={otpStatus}
                  type="number"
                  onChange={(e) => handleChange(e, index)}
                  length="1"
                />
              );
            })}
          </section>
          <p className="resend-link">Resend code</p>
          <div className="back-icon" onClick={() => changePage("first")}>
            <span>Back</span>
          </div>
        </div>
      </div>
    </>
  );
};

//Password
const PageTwo = ({ passwordRef, setActivePage, nextPage }) => {
  const password = [useRef(""), useRef("")];
  const [passwordStatus, setPasswordStatus] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
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

  const validatePassword = (e) => {
    password[0].current = e.target.value;
    if (password[0].current == "") {
      setPasswordStatus("");
      if (password[1].current == "") {
        setPasswordMatch("");
      }
      return;
    }
    if (
      validator.isStrongPassword(password[0].current, {
        minLength: 7,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setPasswordStatus("valid");
    } else {
      setPasswordStatus("invalid");
    }
    //When user changes already typed password. Checking now if confirmation password is matching or not.
    if (passwordMatch != "") {
      if (password[1].current === password[0].current) {
        setPasswordMatch("valid");
      } else {
        setPasswordMatch("invalid");
      }
    }
  };

  const matchPassword = (e) => {
    password[1].current = e.target.value;
    if (password[1].current == "" && password[0].current == "") {
      setPasswordMatch("");
      return;
    }
    if (password[1].current === password[0].current) {
      setPasswordMatch("valid");
    } else {
      setPasswordMatch("invalid");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordStatus == "valid" && passwordMatch == "valid") {
      console.log(password[0].current);
      passwordRef.current = password[0].current;
      nextPage();
    }
  };
  return (
    <>
      <header>
        <Logo />
      </header>
      <form className="signup-form" onSubmit={(e) => handleSubmit(e)}>
        <h2>Create Password</h2>
        <section className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type={passwordFieldType}
            id="password"
            className={`${passwordStatus}-password`}
            onChange={(e) => validatePassword(e)}
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
          {passwordStatus == "invalid" && (
            <ul className="password-validation-rules">
              <li>Password must contain:</li>
              <li>atleast one lowercase letter</li>
              <li>atleast one uppercase letter</li>
              <li>atleast one number</li>
              <li>atleast one symbol</li>
              <li>minimum 8 characters</li>
            </ul>
          )}
        </section>
        <section className="form-group">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type={passwordFieldType}
            id="confirmpassword"
            className={`${passwordMatch}-password`}
            onChange={(e) => matchPassword(e)}
            required
          />
          {passwordMatch == "invalid" && <p>Password does not match.</p>}
        </section>
        <button className="signup-button">CREATE PASSWORD</button>
        <div
          className="back-icon"
          onClick={() => {
            setActivePage("first");
          }}
        >
          <span>Back</span>
        </div>
      </form>
    </>
  );
};

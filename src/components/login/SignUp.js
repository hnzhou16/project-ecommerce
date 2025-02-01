import React from 'react';
import {useState} from "react";
import {serverAPI} from "../consts";
import {See} from "../../assets/icons/see";
import {Unseen} from "../../assets/icons/unseen";
import {Check} from "../../assets/icons/check";
import './SignUp.css'

export const SignUp = ({setShowSignUp}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false,
  });


  // make more sense to write 'validateEmail' as a function rather than a 'useEffect'
  // because it's not only bounded by email input e.g. input onBlur...
  const validateEmail = () => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    setIsEmailValid(re.test(email));
    if (!email) {
      setEmailError("Please enter an email address");
    } else if (!isEmailValid) {
      setEmailError(
        "Email address is not in the correct format (xxx@yyy.zzz). Please correct the email address.",
      )
    } else {
      // need to set error to "" if all criteria met (clean up the previous error)
      setEmailError('')
    }
  };

  const isPasswordEmpty = () => {
    if (!password) {
      setPasswordError("Please enter your password");
    }
  }

  const validatePassword = () => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /\d/.test(password),
    });
  };

  const isPasswordValid = Object.values(passwordCriteria).every(Boolean);

  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateEmail(email);

    if (isFormValid) {
      try {
        const response = await fetch(`${serverAPI}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password,
          })
        })

        if (response.ok) {
          alert("Registered Successfully");
        } else {
          alert(`Registration failed. Please try again.`);
        }
      } catch (e) {
        console.error("Error during registration:", e);
        alert("Registration failed. Please try again.");
      }
    }
  }

  const toggleShowHide = () => {
    setHidePassword(!hidePassword);
  };

  return (

    <div className="signUpFormContainer">
      <div className="signupForm">
        <h1 className="title">Create a member account</h1>
        <form onSubmit={handleSubmit}>
          <div className={`inputGroup ${(emailError && !isEmailValid) ? "error" : ""}`}>
            <label htmlFor="email">Email address</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onBlur={validateEmail}
                required
              />
              {emailError.length > 0 &&
                !isEmailValid &&
                <span className="error-icon" onClick={() => setEmail('')}>×</span>}
            </div>
            {emailError.length > 0 &&
              !isEmailValid &&
              <span className="error-message">{emailError}</span>
            }
          </div>
          <div className={`inputGroup ${(passwordError && !isPasswordValid) ? "error" : ""}`}>
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type={hidePassword ? "password" : "text"}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                onBlur={isPasswordEmpty}
                required
              />
              <span className="showOrHiddenPassword" onClick={toggleShowHide}>
                  {hidePassword ? <See/> : <Unseen/>}
                </span>
            </div>
            {passwordError.length > 0 &&
              !isPasswordValid &&
              <span className="error-message">{passwordError}</span>
            }
            <div className="password-criteria">
              <div className="criteria-column">
                <div
                  className={`criteriaItem ${
                    passwordCriteria.length ? "met" : ""
                  }`}
                >
                  <div className="check">
                    <Check/>
                  </div>
                  <p>8 characters</p>
                </div>
                <div
                  className={`criteriaItem ${
                    passwordCriteria.uppercase ? "met" : ""
                  }`}
                >
                  <div className="check">
                    <Check/>
                  </div>
                  <p>1 uppercase</p>
                </div>
              </div>
              <div className="criteria-column">
                <div
                  className={`criteriaItem ${
                    passwordCriteria.lowercase ? "met" : ""
                  }`}
                >
                  <div className="check">
                    <Check/>
                  </div>
                  <p>1 lowercase</p>
                </div>
                <div
                  className={`criteriaItem ${
                    passwordCriteria.digit ? "met" : ""
                  }`}
                >
                  <div className="check">
                    <Check/>
                  </div>
                  <p>1 digit</p>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="createAccountButton"
            disabled={!isFormValid}
          >
            CREATE A MEMBER ACCOUNT
          </button>
        </form>

        <button className="signInButton"
                onClick={() => setShowSignUp(false)}>SIGN IN
        </button>
      </div>
    </div>
  )
}
import './LogIn.css'
import React from 'react';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {authAPI, cartAPI} from "../consts";
import {See} from "../../assets/icons/see";
import {Unseen} from "../../assets/icons/unseen";
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess, logout, setToken, setUser, setUserId} from "../../redux/actions/authAction";
import {fetchCartItems} from "../../redux/actions/shoppingCartAction";

export const LogIn = ({setShowSignUp}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [passwordError, setPasswordError] = useState("");

  const isEmailEmpty = () => {
    if (!email) {
      setEmailError("Please enter your email address.")
    } else {
      setEmailError("")
    }
  }

  const isPasswordEmpty = () => {
    if (!password) {
      setPasswordError("Please enter your password.")
    } else {
      setPasswordError("")
    }
  }

  const isFormValid = email && password

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      // if using fetch instead of axios, must add '.then().then()'
      fetch(`${authAPI}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
        })
      }).then(res =>
          // .then can only carry on the response body, status code need to manually saved in the return object
          res.json().then(data => ({status: res.status, data: data})))
        .then(res => {
          if (res.status === 200) {
            alert("Login Successfully");

            const {user, token} = res.data.data
            const userId = user.id
            const expirationTime = new Date().getTime() + 2 * 60 * 60 * 1000;

            delete user.cart

            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)
            localStorage.setItem('expirationTime', expirationTime)

            dispatch(setToken(token))
            dispatch(setUser(user))
            dispatch(setUserId(user.id))
            dispatch(loginSuccess())
            // !!! fetch shoppingCart info here in shoppingCartAction
            dispatch(fetchCartItems(userId, shoppingCart))

            // should NOT clear token using 'setTimeout', it'll be useless for other pages

            // setTimeout(
            //   () => {
            //     localStorage.removeItem("user");
            //     localStorage.removeItem("token");
            //     localStorage.removeItem("expirationTime");
            //     dispatch(logout);
            //     alert("Your session has expired. Please log in again.");
            //   },
            //   2 * 60 * 60 * 1000
            // )

            navigate('/shop/mybag')
          } else {
            alert(`Login failed.`);
          }
        })
        .catch(e => {
          alert("Login failed.")
        })
    }
  };

  const toggleShowHide = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <div className="logInFormContainer">
      <div className="logInForm">
        <h1 className="title">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className={`inputGroup ${(email.length <= 0) ? "error" : ""}`}>
            <label htmlFor="email">Email address</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onBlur={isEmailEmpty}
                required
              />
              {emailError.length > 0 &&
                <span className="error-icon" onClick={() => setEmail('')}>×</span>}
            </div>
            {emailError.length > 0 &&
              <span className="error-message">{emailError}</span>
            }
          </div>
          <div className={`inputGroup ${passwordError ? "error" : ""}`}>
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type={hidePassword ? "password" : "text"}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onBlur={isPasswordEmpty}
                required
              />
              <span className="showOrHiddenPassword" onClick={toggleShowHide}>
                  {hidePassword ? <See/> : <Unseen/>}
                </span>
            </div>
            {passwordError.length > 0 &&
              <span className="error-message">{passwordError}</span>
            }
          </div>
          {/*<button className="forgotPassword"*/}
          {/*        onClick={() => navigate('/account/forgot-password')}>*/}
          {/*  Forgot your password?*/}
          {/*</button>*/}
          <button
            type="submit"
            className="signInButton"
            disabled={!isFormValid}
          >
            SIGN IN
          </button>
        </form>
        <button className="createAccountButton"
                onClick={() => setShowSignUp(true)}>CREATE AN ACCOUNT</button>
      </div>
    </div>
  )
}
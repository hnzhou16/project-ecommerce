import "./SignUpPage.css";
import React from "react"
import {SignUpCarousel} from "../login/SignUpCarousel";
import {SignUp} from "../login/SignUp";
import {LogIn} from "../login/LogIn";
import {useState} from "react";

export const SignUpPage = () => {
  const [showSignUp, setShowSignUp ] = useState(false)

  return (
    <main className="signUpPage">
      <SignUpCarousel/>
      {showSignUp ?  <SignUp setShowSignUp={setShowSignUp}/> : <LogIn setShowSignUp={setShowSignUp}/> }
    </main>
  );
};

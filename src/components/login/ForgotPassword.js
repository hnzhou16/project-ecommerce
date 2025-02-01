import { HeaderConcise } from "../shared/HeaderConcise";
import {Footer} from "../shared/Footer";
import "./ForgotPassword.css";
import React from 'react';
import { useState } from "react";
import {authAPI} from "../consts";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendEmail = async () => {
    try {
      const response = await fetch(
        `${authAPI}/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );
      if (response.ok) {
        console.log("User found.");
      } else {
        console.log('User not found.')
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <HeaderConcise />

      <div className="forgotPasswordMain">
        <div className="container top">
          <div className="title">Set a new password</div>
          <div className="sub">
            Enter the email address associated with your account and
            we’ll send you a link to reset your password.
          </div>
        </div>
        <div className="container">
          <div className="email">Email Address</div>
          <input
            className="enterEmail"
            onChange={handleEmailChange}
            value={email}
            type="text"
          />
        </div>
        <div className="container">
          <button onClick={handleSendEmail}>
            <div className="button">
              <div className="text">SEND EMAIL</div>
            </div>
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};
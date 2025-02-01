import { useParams } from "react-router-dom";
import "./ResetPassword.css";
import { HeaderConcise } from "../shared/HeaderConcise";
import {Footer} from "../shared/Footer";
import React from 'react';
import { useState } from "react";
import {authAPI} from "../consts";

export const ResetPassword = () => {
  const { resetToken } = useParams();
  console.log(resetToken);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordChange2 = (e) => {
    setPassword2(e.target.value);
  };

  const handleSubmit = async () => {
    if (password === password2) {
      try {
        const response = await fetch(
          `${authAPI}/reset-password/${resetToken}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ newPassword: password}),
          },
        );

        if (response.ok) {
          alert("Password has changed successfully");
        } else {
          console.log('Change password failed, ', response);
        }
      } catch (err) {
        console.log("error", err);
      }
    } else {
      alert("Your passwords don't match");
    }
  };

  return (
    <>
      <HeaderConcise />

      <div className="newPasswordMain">
        <div className="container">
          <div className="title">Enter New Password</div>
          <input
            onChange={handlePasswordChange}
            className="password"
            type="password"
          />
        </div>
        <div className="container">
          <div className="title">Re-eniter New Password</div>
          <input
            onChange={handlePasswordChange2}
            type="password"
            className="password2"
          />
        </div>
        <div className="container">
          <button onClick={handleSubmit} className="enter">
            <p>SUBMIT</p>
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};
import {logout} from "../../redux/actions/authAction";
import React from 'react';
import {useDispatch} from "react-redux";

// a custom hook - otherwise dispatch can not be used inside a regular function
export const useCheckTokenExpiration = () => {
  const dispatch = useDispatch()

  return () => {
    const expirationTime = localStorage.getItem('expirationTime')

    if (!expirationTime || (expirationTime && new Date().getTime() > expirationTime)) {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      localStorage.removeItem("expirationTime")
      localStorage.removeItem("paymentTotal")
      dispatch(logout());
      // alert("Your session has expired. Please log in again.")
      return false
    }
    return true
  }
}
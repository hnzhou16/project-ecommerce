import './ThankYou.css'
import React from 'react';
import {useNavigate} from "react-router-dom";
import {HeaderConcise} from "../shared/HeaderConcise";
import {Footer} from "../shared/Footer";

export const ThankYou = () => {
  const navigate = useNavigate()
  return (
    <>
      <HeaderConcise/>
      <div className='thankYou'>
        <h1>Thank you for shopping with us!</h1>
        <button onClick={()=> navigate('/')}>CONTINUE SHOPPING</button>
      </div>
      <Footer/>
    </>
  );
}
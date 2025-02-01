import './EmptyShoppingCart.css'
import React from 'react';
import {useNavigate} from "react-router-dom";

export const EmptyShoppingCart = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className='emptyShoppingCartBody'>
        <h1>Give your bag some love!</h1>
        <button className='whatsNewBtn' onClick={() => navigate('/')}>SHOP WHAT'S NEW
        </button>
      </div>
    </>
  )
}
import "./Header.css"
import React from "react"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginSuccess, logout} from "../../redux/actions/authAction";
import {Women} from "./Women";
import {Men} from "./Men";
import {Accessories} from "./Accessories";
import {useCheckTokenExpiration} from "../login/useCheckTokenExpiration";
import {VerifyToken} from "../login/VerifyToken";
import {setCartItemsCount} from "../../redux/actions/shoppingCartAction";

export const Header = ({isSticky}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const checkTokenExpiration = useCheckTokenExpiration()

  const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)
  const cartItemsCount = useSelector(state => state.shoppingCartReducer.cartItemsCount)
  const user = useSelector(state => state.authReducer.user);
  const isLogin = useSelector(state => state.authReducer.login)

  const [headerExpand, setHeaderExpand] = useState([false, false, false]);


  useEffect(() => {
    if (checkTokenExpiration() && VerifyToken()) {
      dispatch(loginSuccess())
    } else {
      dispatch(logout())
    }
  }, []);

  const handleHover = (index, newValue) => {
    // Create a new array with the updated element
    const newHeaderExpand = [...headerExpand];
    newHeaderExpand.map((item, i) => {
      if (i === index) {
        newHeaderExpand[index] = newValue;
      } else {
        newHeaderExpand[i] = false
      }
    })
    // Update the state with the new array
    setHeaderExpand(newHeaderExpand);
  };

  useEffect(() => {
    const shoppingCartCount = shoppingCart && shoppingCart.reduce((total, item) => total + item.quantity, 0);
    dispatch(setCartItemsCount(shoppingCartCount))
  }, [shoppingCart, isLogin]);

  const handleOpenLoginPage = () => {
    navigate('/account/signup')
  }

  return (
    <div className='header'>
      <div className="topNav">
        <a href="https://www.gap.com/" id="topNavAnimation">
          * Products information and images sourced from: https://www.gap.com/.
        </a>
      </div>
      <div className={`headerContainer ${isSticky ? 'sticky' : ""}`}>
        <div className='headerNav'>
          <div className="headerLeft">
            <img
              src="https://project-ecommerce-images.s3.us-east-1.amazonaws.com/assets/logo_hz.png"
              alt="Logo" onClick={() => navigate('/')}
            />

            <div onMouseEnter={() => handleHover(0, true)}>
              <a href="" id="headerAnimation">
                WOMEN
              </a>
            </div>

            <div onMouseEnter={() => handleHover(1, true)}>
              <a href="" id="headerAnimation">
                MEN
              </a>
            </div>

            <div onMouseEnter={() => handleHover(2, true)}>
              <a href="" id="headerAnimation">
                ACCESSORIES
              </a>
            </div>
          </div>
          <div className="headerRight">
            <div className="icons">
              <a href="">
                <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt=""/>
                {isLogin
                  ? <p>{`Welcome ${user?.firstName || ''}`}</p>
                  : <p id="topNavAnimation" onClick={handleOpenLoginPage}>Sign In</p>
                }
              </a>
              <a onClick={() => navigate('/shop/mybag')}>
                <img src="https://www.svgrepo.com/show/43071/shopping-bag.svg" alt=""/>
                <p>{cartItemsCount}</p>
              </a>
            </div>
          </div>
        </div>

        {headerExpand[0] && <Women handleHover={handleHover}/>}
        {headerExpand[1] && <Men handleHover={handleHover}/>}
        {headerExpand[2] && <Accessories handleHover={handleHover}/>}

      </div>
    </div>
  );
};
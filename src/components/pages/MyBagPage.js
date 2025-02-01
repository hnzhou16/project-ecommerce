import React from "react"
import {useSelector} from "react-redux";
import './MyBagPage.css';
import {HeaderConcise} from "../shared/HeaderConcise";
import {Footer} from "../shared/Footer";
import {EmptyShoppingCart} from "../mybag/EmptyShoppingCart";
import {ShoppingCart} from "../mybag/ShoppingCart";

export const MyBagPage = () => {
  const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)
return <>
  <HeaderConcise/>
  <div className="shoppingCart">
    {shoppingCart.length > 0 ? <ShoppingCart/> : <EmptyShoppingCart/>}
  </div>
  <Footer/>
</>
}
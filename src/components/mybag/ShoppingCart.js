import './ShoppingCart.css'
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
  changeQuantity,
  changeQuantityToBackend,
  setCartItemsCount,
  setTotalPreTax
} from "../../redux/actions/shoppingCartAction";
import {EditModal} from "./EditModal";
import {RemoveItemModal} from "./RemoveItemModal";
import {OrderSummary} from "./OrderSummary";
import {useCheckTokenExpiration} from "../login/useCheckTokenExpiration";
import {VerifyToken} from "../login/VerifyToken";
import {loginSuccess, logout} from "../../redux/actions/authAction";

export const ShoppingCart = () => {
  const dispatch = useDispatch()
  const checkTokenExpiration = useCheckTokenExpiration()

  const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)
  const cartItemsCount = useSelector(state => state.shoppingCartReducer.cartItemsCount)
  const isLogin = useSelector(state => state.authReducer.login)

  const [showEditModal, setShowEditModal] = useState(Array(shoppingCart.length).fill(false))

  const [removeModal, setRemoveModal] = useState(false)
  const [removeIndex, setRemoveIndex] = useState()

  const totalPrePrice = useSelector(state => state.shoppingCartReducer.totalPreTax)

  useEffect(() => {
    if (checkTokenExpiration() && VerifyToken()) {
      dispatch(loginSuccess())
    } else {
      dispatch(logout())
    }
  }, []);

  useEffect(() => {
    const total = shoppingCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    dispatch(setTotalPreTax(total.toFixed(2)))

    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));

    const cartItemsCount = shoppingCart.reduce((total, item) => total + item.quantity, 0);
    dispatch(setCartItemsCount(cartItemsCount))
  }, [shoppingCart, isLogin]);


  const handleEditModal = (index) => {
    // 'showEditModal' is the array that can use 'map' function
    // 'setShowEditModal' can NOT directly use 'map' inside '()', it can only accept 'newState'
    // below code is WRONG
    // setIsVisibleEdit(prevState => prevState.map((item, i) => i === index ? !item : item))
    const newState = showEditModal.map((item, i) =>
      i === index ? !item : item,
    )
    setShowEditModal(newState);
  }

  const handleChangeQuantity = (newQuantity, index) => {
    dispatch(changeQuantity(newQuantity, index))

    let isLogin = false
    if (checkTokenExpiration() && VerifyToken()) {
      isLogin = true
    }

    if (isLogin) {
      const user = localStorage.getItem('user')
      if (user) {
        const parsedUser = JSON.parse(user)
        const userId = parsedUser.id
        const cartItemId = shoppingCart[index].id
        dispatch(changeQuantityToBackend(userId, cartItemId, newQuantity))
      } else {
        console.error('User not found in local storage.')
      }
    }
  }

  const closeRemoveModal = () => {
    setRemoveModal(false)
  }


  return (
    <div className="shoppingCartWrapper">
      <div className="shoppingCartBody">
        <div className="itemCount">
          <span className="myBag">My Bag </span>
          <span>
              ({cartItemsCount} {cartItemsCount > 1 ? "Items" : "Item"})
            </span>
        </div>
        <div className="itemsContainer">
          {shoppingCart.map((item, index) => (
            <div key={index} className="itemContainer">
              <img
                className="productImage"
                src={item.image}
                alt={item.swatchName}
              />
              <div className="productDetailsContainer">
                <h3 className="productName">{item.name}</h3>
                <p className="productColor">{item.color}</p>
                <div className="productDetails">
                  <div className="sizeAndEditContainer">
                    <div className="size">Size {item.size}</div>
                    <button
                      onClick={() => handleEditModal(index)}
                    >Edit
                    </button>
                  </div>
                  <div className="productDetailsRight">
                    <div className="priceContainer">
                      <div>Item Price</div>
                      <div>${Number(item.price).toFixed(2)}</div>
                    </div>
                    <div className="quantityContainer">
                      <label htmlFor={`quantity-${index}`}>Quantity</label>
                      <select
                        className="dropdownMenu"
                        id={`quantity-${index}`}
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = e.target.value
                          handleChangeQuantity(newQuantity, index)
                        }}
                      >
                        {Array(5).fill(0).map((value, i) => (
                          <option
                            className="dropdownItem"
                            key={i + 1}
                            value={i + 1}
                          >
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="totalPriceContainer">
                      <div>Total Price</div>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="shippingAndReturnContainer">
                  <div>Free Shipping + Free Returns</div>
                  <div className="removeContainer">
                    <button
                      onClick={() => {
                        setRemoveModal(true)
                        setRemoveIndex(index)
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              {showEditModal[index] && (
                <EditModal
                  productId={item.productId}
                  sizeInit={item.size}
                  colorInit={item.colorId}
                  index={index}
                  handleEditModal={handleEditModal} // 'EditModal' can directly modify 'showEditModal' here
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="orderSummary">
        <OrderSummary/>
      </div>
      {removeModal &&
        <RemoveItemModal
          closeRemoveModal={closeRemoveModal}
          index={removeIndex}
        />
      }
    </div>
  );
}
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import "./PaymentPage.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {useNavigate} from "react-router-dom";
import {HeaderConcise} from "../shared/HeaderConcise";
import {Footer} from "../shared/Footer";
import {Paypal} from "../checkout/Paypal";

export const PaymentPage = () => {
  const navigate = useNavigate();

  const userId =
    useSelector((state) => state.authReducer.userId) ||
    JSON.parse(localStorage.getItem("user")).id
  const userInfo = useSelector((state) => state.authReducer.userInfo)

  const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)
  const cartItemsCount = useSelector(state => state.shoppingCartReducer.cartItemsCount)

  const shippingCost = useSelector((state) => state.shoppingCartReducer.shippingCost)
  const taxAmount = useSelector((state) => state.shoppingCartReducer.taxAmount)
  const totalPreTax = useSelector((state) => state.shoppingCartReducer.totalPreTax)
  const totalAfterTax = useSelector((state) => state.shoppingCartReducer.totalAfterTax)

  const handleEdit = () => {
    navigate('/shop/checkout')
  }

  return (
    <>
      <HeaderConcise/>
      <div className="paymentMain">
      <h1>Checkout</h1>
      <div className="checkoutBody">
        <div className="checkoutBodyLeft">
          <div className="infoCard">
            <div className="infoRow">
              <div className="infoTitle">
                <div
                  className="icon"
                  style={{display: "inline", marginRight: "10px"}}
                >
                  <CheckCircleOutlineIcon/>
                </div>
                Notifications to
              </div>
              <div className="infoDetails">
                <div className="infoDetailsHeader">Email</div>
                <div className="infoDetailsRow">
                  <p>{userInfo.email}</p>
                </div>
              </div>
              <div onClick={handleEdit} className="infoEdit">Edit</div>
            </div>
            <div className="infoRow">
              <div className="infoTitle">
                <div
                  className="icon"
                  style={{display: "inline", marginRight: "10px"}}
                >
                  <CheckCircleOutlineIcon/>
                </div>
                Sending to
              </div>
              <div className="infoDetails">
                <div className="infoDetailsHeader">Address</div>
                <div className="infoDetailsRow">
                  <p>
                    {userInfo &&
                      `${userInfo.firstName} ${userInfo.lastName}`}
                  </p>
                  <p>{userInfo && `${userInfo.streetAddress},`}</p>
                  <p>
                    {userInfo &&
                      `${userInfo.city}, ${userInfo.stateUSA}, ${userInfo.zipcode}`}
                  </p>
                </div>
              </div>
              <div onClick={handleEdit} className="infoEdit">Edit</div>
            </div>
            <div className="infoRow">
              <div className="infoTitle">
                <div
                  className="icon"
                  style={{display: "inline", marginRight: "10px"}}
                >
                  <CheckCircleOutlineIcon/>
                </div>
                Estimated delivery
              </div>
              <div className="infoDetails">
                <LocalShippingOutlinedIcon className="truckIcon"/>
                {shippingCost === 0 && <p>2-7 business days (FREE)</p>}
                {shippingCost === 20 && <p>2-4 business days ($20.00)</p>}
                {shippingCost === 30 && <p>2-3 business days ($30.00)</p>}
              </div>
              <div onClick={handleEdit} className="infoEdit">Edit</div>
            </div>
          </div>
          <div className="infoCard">
            <div className="payment">
              <div className="paymentHeader">Payment method</div>
              <div className="paymentRow">
                <div className="paymentMethod">
                  <img src="https://project-ecommerce-images.s3.us-east-1.amazonaws.com/assets/paypal.jpg" alt="Loading"/>
                  <h3>Pay with PayPal</h3>
                </div>
                <div className="paypal">
                  {totalAfterTax > 0 && (
                    <Paypal amount={totalAfterTax}/>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="checkoutBodyRight">
          <div className="orderSummary">
            <h2>Order summary</h2>
            <div className="orderHeader">
              <div className="orderHeaderLeft">
                <ShoppingBagOutlinedIcon/>
                <span>{`${cartItemsCount} ${
                  cartItemsCount === 1 && cartItemsCount !== 0
                    ? "item"
                    : "items"
                }`}</span>
              </div>
              <div className="orderHeaderRight">
                ${totalPreTax}
              </div>
            </div>
              <div className="shoppingCartContainer">
                {shoppingCart &&
                  shoppingCart.length > 0 &&
                  shoppingCart.map((item, index) => (
                    <div key={index} className="shoppingCartItem">
                      <img
                        className="productImage"
                        src={item.image}
                        alt={item.color}
                      />
                      <div className="productInfo">
                        <h3>{item.name}</h3>
                        <p>Color: {item.color}</p>
                        <p>Size: {item.size}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${Number(item.price).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
              </div>

            <div className="orderTotal">
              <div className="orderTotalRow">
                <span>Subtotal</span>
                <span>{`$${totalPreTax}`}</span>
              </div>
              <div className="orderTotalRow">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? "FREE" : `$${shippingCost}`}
                </span>
              </div>
              <div className="orderTotalRow">
                <span>Tax</span>
                <span>{`$${taxAmount}`}</span>
              </div>
              <div className="orderTotalFinal">
                <h3>
                  Order Total: ${totalAfterTax}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
    </>
  );
};
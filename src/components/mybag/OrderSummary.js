import './OrderSummary.css'
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useCheckTokenExpiration} from "../login/useCheckTokenExpiration";
import {VerifyToken} from "../login/VerifyToken";
import {loginSuccess, logout} from "../../redux/actions/authAction";

export const OrderSummary = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const checkTokenExpiration = useCheckTokenExpiration()

  const shoppingCart = useSelector((state) => state.shoppingCartReducer.shoppingCart)
  const isLogin = useSelector((state) => state.authReducer.login)
  const shippingCost = useSelector(state => state.shoppingCartReducer.shippingCost)
  const taxAmount = useSelector(state => state.shoppingCartReducer.taxAmount)
  const totalPreTax = useSelector(state => state.shoppingCartReducer.totalPreTax)
  const totalAfterTax = useSelector(state => state.shoppingCartReducer.totalAfterTax)


  const [popUpText, setPopUpText] = useState("")
  const [showPopUp, setShowPopUp] = useState(null)
  const [showTax, setShowTax] = useState(false)
  const [isCheckoutPage, setIsCheckOutPage] = useState(false)


  useEffect(() => {
    if (checkTokenExpiration() && VerifyToken()) {
      dispatch(loginSuccess())
    } else {
      dispatch(logout())
    }

    if (location.pathname.includes('checkout')) {
      setShowTax(true)
      setIsCheckOutPage(true)
    } else {
      setShowTax(false)
      setIsCheckOutPage(false)
    }

  }, []);

  const handleMoreInfo = (text, id) => {
    if (showPopUp === id) {
      setShowPopUp(null);
    } else {
      setShowPopUp(id);
      setPopUpText(text);
    }
  };

  const handlePlaceOrder = () => {
    const requestBody = {
      taxRate: 1.13,
      isActive: true,
      isDelete: false,
      orderItems: shoppingCart.map((item) => {
        return {
          quantity: item.quantity,
          productId: item.productId,
          colorId: item.colorId,
          size: item.size,
        };
      }),
    };
  }

  return (
    <>
      <div className="orderSummaryContainer">
        <div className="orderSummaryTitle">Order Summary</div>
        <div className="orderSummaryInfo">
          <div className="orderSummaryInfoSections">
            <div className="orderSummaryInfoSectionsLeft">
              <div className="orderSummaryInfoSectionsLeftText">Subtotal</div>
            </div>
            <div className="orderSummaryInfoSectionsRight">
              {`$${totalPreTax}`}
            </div>
          </div>

          <div className="orderSummaryInfoSections">
            <div className="orderSummaryInfoSectionsLeft">
              <div className="orderSummaryInfoSectionsLeftText">Shipping</div>
              <div
                className="moreInfo"
                onClick={() =>
                  handleMoreInfo(
                    "We offer Free Standard Shipping on all orders within the United States. If you’d like to expedite shipping or ship to a different country, you can do so in checkout.",
                    "shipping",
                  )
                }
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/8/8201.png"
                  alt=""
                />
                {showPopUp === "shipping" && (
                  <div className="popUp">{popUpText}</div>
                )}
              </div>
            </div>

            <div className="orderSummaryInfoSectionsRight">{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</div>
          </div>

          <div className="orderSummaryInfoSections">
            <div className="orderSummaryInfoSectionsLeft">
              <div className="orderSummaryInfoSectionsLeftText">Tax</div>

              <div
                className="moreInfo"
                onClick={() => {
                  handleMoreInfo(
                    "Taxes are based on your shipping location’s provincial and local sales tax.",
                    "tax",
                  );
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/8/8201.png"
                  alt=""
                />
                {showPopUp === "tax" && (
                  <div className="popUp">{popUpText}</div>
                )}
              </div>
            </div>

            <div className="orderSummaryInfoSectionsRight">
              {showTax ? taxAmount :'Calculated at checkout'}

            </div>
          </div>

          <div className="estimatedTotal">
            <div className="estimatedTotalTop">
              <div>Estimated Total</div>
              <div> {showTax ? `$${totalAfterTax}` : `$${totalPreTax}`}</div>
            </div>
          </div>
        </div>

        <div className="pay">
          {isCheckoutPage
            ? ''
            : <button onClick={() => {
            isLogin
              ? navigate("/shop/checkout")
              : navigate('/account/signup')
          }}>
            CHECKOUT
          </button>
          }

        </div>
      </div>
    </>
  )
}
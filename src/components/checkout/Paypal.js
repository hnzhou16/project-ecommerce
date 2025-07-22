import {useEffect} from 'react'
import {cartAPI} from "../consts"
import './Paypal.css'
import React from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "../../redux/actions/shoppingCartAction";

export const Paypal = ({amount}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const paypalClientID = process.env.REACT_APP_PAYPAL_CLIENT_ID

  const userId = useSelector(state => state.authReducer.userId)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientID}&currency=USD`
    script.setAttribute("data-namespace", "paypal_sdk")
    script.async = true

    script.onload = () => {
      const paypal = window.paypal_sdk

      if (!paypal || !paypal.FUNDING) {
        console.error('PayPal SDK is not loaded correctly.');
        return;
      }

      paypal.Buttons({
        components: 'buttons',
        style: {
          color: 'blue', // Button color
          shape: 'rect', // Shape of the button
          // layout: 'vertical', // Layout of the button (horizontal or vertical)
          label: 'paypal' // Show only the PayPal label
        },
        fundingSource: paypal.FUNDING.PAYPAL,

        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount,
              }
            }]
          })
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            console.log('Payment successful!', details)
            fetch(`${cartAPI}/clearCart/${userId}`, {
              method: "DELETE",
              headers: {
                'Content-Type': "application/json",
              }
            }).then((response) => {
              if (!response.ok) {
                throw new Error('Failed to clear the cart');
              }
              console.log('Cart cleared successfully!')
            })
              .catch(err => {
                console.error('Error clearing the cart:', err)
              })

            localStorage.removeItem('shoppingCart')
            dispatch(clearCart())

            navigate("/shop/checkout/thankyou")
          })
        }
      }).render('#paypalButtonContainer')
    }
    document.body.appendChild(script)
  }, [])

  return <div className="paypalButtonContainer" id="paypalButtonContainer"></div>
}

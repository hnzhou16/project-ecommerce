import {actionTypes} from "./actionTypes";
import {cartAPI} from "../../components/consts";

// redux thunk (dispatch) enable async function (call API)
export const fetchCartItems = (userId, shoppingCart) => dispatch => {
  console.log(userId, shoppingCart)
  fetch(`${cartAPI}/getCart`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      shoppingCart
    })
  })
    .then(res => res.json())
    .then(res => {
      console.log(res.data)
      localStorage.setItem("shoppingCart", JSON.stringify(res.data.cartItems))
      dispatch ({
        type: actionTypes.FETCH_CART_ITEMS,
        payload: userId,
        payload2: res.data.id,
        payload3: res.data.cartItems
      })
    })
    .catch(err => console.log(err))
}

export const addItems = (cartItem) => {
  return {
    type: actionTypes.ADD_ITEMS,
    payload: cartItem
  }
}

export const addItemsToBackend = (userId, cartItem) => {
  fetch(`${cartAPI}/addItem`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      cartItem
    })
  })
    .then(res => res.json())
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  return {
    type: actionTypes.ADD_ITEMS_BACKEND,
    // payload: cartItem
  }
}

export const editCart = (newItemInfo) => {
  return {
    type:actionTypes.EDIT_CART,
    payload: newItemInfo
  }
}

export const editCartToBackend = (userId, cartItemId, newItemInfo) => {
  fetch(`${cartAPI}/editItem/${cartItemId}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      newItemInfo
    })
  })
    .then(res => res.json())
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  return {
    type: actionTypes.EDIT_CART_BACKEND,
    // payload: cartItem
  }
}

export const changeQuantity = (quantity, index) => {
  return {
    type: actionTypes.CHANGE_QUANTITY,
    payload: quantity,
    payload2: index
  }
}

export const changeQuantityToBackend = (userId, cartItemId, newQuantity) => {
  fetch(`${cartAPI}/changeQuantity/${cartItemId}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      newQuantity
    })
  })
    .then(res => res.json())
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  return {
    type: actionTypes.CHANGE_QUANTITY_BACKEND,
    // payload: cartItem
  }
}

export const removeItem = (index) => {
  return {
    type: actionTypes.REMOVE_ITEM,
    payload: index
  }
}

export const removeItemToBackend = (userId, cartItemId) => {
  fetch(`${cartAPI}/removeItem/${cartItemId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      userId
    })
  })
    .then(res => res.json())
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  return {
    type: actionTypes.REMOVE_ITEM_BACKEND,
    // payload: cartItem
  }
}

export const setCartItemsCount = (count) => {
  return {
    type: actionTypes.CART_ITEMS_COUNT,
    payload: count
  }
}

export const setShippingCost = (shippingCost) => {
  return {
    type: actionTypes.SET_SHIPPING_COST,
    payload: shippingCost
  }
}

export const setTotalPreTax = (totalPreTax) => {
  return {
    type: actionTypes.SET_TOTAL_PRE_TAX,
    payload: totalPreTax
  }
}

export const clearCart = () => {
  return {
    type: actionTypes.CLEAR_CART
  }
}


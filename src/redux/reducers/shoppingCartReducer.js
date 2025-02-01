import {actionTypes} from "../actions/actionTypes";

const paymentTotal = JSON.parse(localStorage.getItem("paymentTotal")) || {};

const initState = {
  shoppingCart: JSON.parse(localStorage.getItem("shoppingCart")) || [],
  cartId: localStorage.getItem("cartId") || null,
  cartItemsCount: 0,
  shippingCost: 0.00,
  taxRate: 0.10,
  taxAmount: paymentTotal.taxAmount || 0.00,
  totalPreTax: paymentTotal.totalPreTax || 0.00,
  totalAfterTax: paymentTotal.totalAfterTax || 0.00
};

export const shoppingCartReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CART_ITEMS:
      return {
        ...state,
        cartId: action.payload2,
        shoppingCart: action.payload3,
      }

    case actionTypes.ADD_ITEMS:
      let newShoppingCart = [...state.shoppingCart]
      const cartItem = action.payload

      if (newShoppingCart) {
        // 'find' is a reference that will directly modify the original array
        let existingItem = newShoppingCart.find(
          (item) =>
            item.productId === cartItem.productId &&
            item.colorId === cartItem.colorId &&
            (item.size === cartItem.size || (!item.size && !cartItem.size))
        )
        if (existingItem) {
          existingItem.quantity += 1
        } else {
          newShoppingCart.push({...cartItem, quantity: 1})
        }
      } else {
        // MUST use 'else', otherwise the code below will run whatsoever
        newShoppingCart.push({...cartItem, quantity: 1})
      }

      return {
        ...state,
        shoppingCart: newShoppingCart,
      };

    case actionTypes.CHANGE_QUANTITY:
      const newQuantity = Number(action.payload)
      const index = action.payload2

      return {
        ...state,
        shoppingCart: state.shoppingCart.map((item, i) =>
          i === index ? {...item, quantity: newQuantity} : item)
      };

    case actionTypes.EDIT_CART:
      const {editIndex, colorId, color, size, image} = action.payload
      let prevCartItem = null
      let newCartItem = null
      let editShoppingCart = [...state.shoppingCart]
      editShoppingCart.forEach((item, i) => {
        if (i === editIndex) {
          prevCartItem = item
          item.colorId = colorId
          item.color = color
          item.size = size
          item.image = image
          newCartItem = item
        }
      })

      return {
        ...state,
        shoppingCart: editShoppingCart,
      };

    case actionTypes.REMOVE_ITEM:
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter((item, i) => i !== action.payload)
      };

    case actionTypes.CART_ITEMS_COUNT:
      return {
        ...state,
        cartItemsCount: action.payload
      }

    case actionTypes.SET_SHIPPING_COST:
      const shippingCost = parseFloat(action.payload)
      const curTotalAfterTax = shippingCost + parseFloat(state.totalPreTax) + parseFloat(state.taxAmount)

      return {
        ...state,
        shippingCost: shippingCost.toFixed(2),
        totalAfterTax: curTotalAfterTax.toFixed(2)
      };

    case actionTypes.SET_TOTAL_PRE_TAX:
      const totalPreTax = parseFloat(action.payload)
      const taxAmount = totalPreTax * state.taxRate
      const curShippingCost = parseFloat(state.shippingCost)
      const totalAfterTax = totalPreTax + taxAmount + curShippingCost

      const paymentTotal = {
        "totalPreTax": totalPreTax.toFixed(2),
        "shippingCost": curShippingCost.toFixed(2),
        "taxAmount": taxAmount.toFixed(2),
        "totalAfterTax": totalAfterTax.toFixed(2)
      }
      localStorage.setItem('paymentTotal', JSON.stringify(paymentTotal))

      return {
        ...state,
        totalPreTax: totalPreTax.toFixed(2),
        taxAmount: taxAmount.toFixed(2),
        totalAfterTax: totalAfterTax.toFixed(2)
      };

    case actionTypes.CLEAR_CART:
      return {
        ...state,
        shoppingCart: []
      }

    default:
      return state
  }
}
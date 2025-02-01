import './RemoveItemModal.css';
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {removeItem, removeItemToBackend} from "../../redux/actions/shoppingCartAction";
import {VerifyToken} from "../login/VerifyToken";
import {useCheckTokenExpiration} from "../login/useCheckTokenExpiration";

export const RemoveItemModal = ({closeRemoveModal, index}) => {
  const dispatch = useDispatch()
  const checkTokenExpiration = useCheckTokenExpiration()

  const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)

  const handleRemoveProduct = (index) => {
    dispatch(removeItem(index))

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
        dispatch(removeItemToBackend(userId, cartItemId))
      } else {
        console.error('User not found in local storage.')
      }
    }

    closeRemoveModal()
  }

  return (
    <div className="removeModalWrapper">
      <div className="removeModalContainer">
        <button className="closeModal" onClick={closeRemoveModal}>
          X
        </button>
        <h2 className="removeWord">
          Are you sure you want to remove this item from your bag?
        </h2>
        <button
          className="removeYes"
          onClick={() => handleRemoveProduct(index)}
        >
          YES, REMOVE THIS ITEM
        </button>
        <button className="removeNo" onClick={closeRemoveModal}>
          No, keep this item
        </button>
      </div>
    </div>
  )
}
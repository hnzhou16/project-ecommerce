import "./EditModal.css";
import {EditCarousel} from "./EditCarousel";
import React from 'react';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
  editCart, editCartToBackend,
} from "../../redux/actions/shoppingCartAction";
import {singleProductUrl} from "../consts";
import {VerifyToken} from "../login/VerifyToken";
import {useCheckTokenExpiration} from "../login/useCheckTokenExpiration";

export const EditModal = ({
                            productId,
                            sizeInit,
                            colorInit,
                            index,
                            handleEditModal,
                          }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkTokenExpiration = useCheckTokenExpiration();

  const shoppingCart = useSelector(state => state.shoppingCartReducer.shoppingCart)

  const [product, setProduct] = useState();
  const [colorId, setColorId] = useState();
  const [colorDes, setColorDes] = useState("");
  const [size, setSize] = useState(sizeInit);
  const [name, setName] = useState()
  const [priceNumber, setPriceNumber] = useState()
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // it's necessary to fetch the product again like the product page
    // because use could jump right to the shopping cart page, when the product data is not fetched before
    fetch(`${singleProductUrl}/${productId}`)
      .then(res => res.json())
      .then(res => {
        console.log(res.data)
        const {data} = res
        setProduct(data)

        // set 'ColorId' after fetch the product, so useEffect won't run on empty product
        setColorId(colorInit)

        const swatch = product?.swatches.find(
          (swatch) => swatch.colorId === colorId,
        )
        if (swatch) {
          setColorDes(swatch.name);
        }
        const price = data.price
        const priceNumber = parseFloat(price).toFixed(2)
        setPriceNumber(priceNumber)

        setName(data.name)

        setLoading(false);
      })

  }, []);

  useEffect(() => {
    if (product) {
      const productCarousel = product?.mainCarousel.find(c => c.colorId === colorId)
      if (productCarousel) {
        setCurrentImage(productCarousel.images[0])
      }

      const swatch = product?.swatches.find(
        (swatch) => swatch.colorId === colorId,
      )
      if (swatch) {
        setColorDes(swatch.name);
      }
    }
  }, [colorId])


  // sequence of arguments in function matters!
  const handleUpdateBag = (productId, index, colorId, colorDes, size, currentImage) => {
    const newItemInfo = {
      editIndex: index,
      colorId,
      color: colorDes,
      size,
      image: currentImage
    }
    dispatch(editCart(newItemInfo))

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
        dispatch(editCartToBackend(userId, cartItemId, newItemInfo))
      } else {
        console.error('User not found in local storage.')
      }
    }

    // 'index' can be passed back to the parent component to close the modal
    handleEditModal(index)
  }

  return (
    // ‘editModal’ is the container to cover whole page with white
  // ‘productEdit’ is the pop-up window
    <div className="editModal">
      <div className="productEdit">
        <div className="carousel">
          {product &&
            <EditCarousel product={product} colorSelected={colorId}/>
          }
        </div>
        <div className="detailEdit">
          <div className="title">{name}</div>
          <div className="price">${priceNumber}</div>
          <div className="selectedColor">Color: {colorDes}</div>
          <div className="swatchesGroup">
            {product && product.swatches.map((swatch, index) => (
              <div
                key={index}
                className={
                  swatch.colorId === colorId ? "swatchImgSelected" : "swatchImg"
                }
                style={{background: `url(${swatch.url})`}}
                onClick={() => setColorId(swatch.colorId)}
              ></div>
            ))}
          </div>
          <div className="selectedSize">Size: {size}</div>
          <div className="sizesGroup">
            {product && product.size.map((item, index) => (
              <button
                key={index}
                className={item === size ? "sizeBtnSelected" : "sizeBtn"}
                onClick={() => setSize(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            className="updateBtn"
            onClick={() =>
              handleUpdateBag(
                productId,
                index,
                colorId,
                colorDes,
                size,
                currentImage,
              )
            }
          >
            UPDATE ITEM
          </button>
          <div
            className="viewDetails"
            onClick={() =>
              navigate(`../../product/${productId}?colorId=${colorId}`)
            }
          >
            View product details
          </div>
          <div className="closeOutBtn" onClick={() => handleEditModal(index)}>
            x
          </div>
        </div>
      </div>
    </div>
  );
};
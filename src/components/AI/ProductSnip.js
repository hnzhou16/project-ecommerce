import './ProductSnip.css'
import React from 'react';
import {useNavigate} from "react-router-dom";

export const ProductSnip = ({product, key}) => {
  const navigate = useNavigate()

  const productId = product.productId
  const colorId = product.swatches[0].colorId
  const handleNavigate = () => {
    navigate(`product/${productId}?colorId=${colorId}`)
  }

  return <div
    className='productSnipMain'
    key={key}
    onClick={handleNavigate}
  >
    <img src={product.mainCarousel.find((c => c.colorId === colorId)).images[0]}
         alt=""/>
    <div className="name">{product.name}</div>
  </div>
}
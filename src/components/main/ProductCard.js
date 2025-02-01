import './ProductCard.css'
import React from 'react';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const ProductCard = ({product}) => {
  const [colorId, setColor] = useState()
  const [images, setImages] = useState()
  const [mainImageIndex, setMainImageIndex] = useState(0)
  const [swatchIndex, setSwatchIndex] = useState(0)
  const [swatchSlide, setSwatchSlide] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    setColor(product.swatches[0].colorId)
    product.mainCarousel.forEach((item, i) => {
      item.colorId === colorId && setImages(item.images)
    })
  }, []);

  useEffect(() => {
    product.mainCarousel.forEach((item, i) => {
      item.colorId === colorId && setImages(item.images)
    })
  }, [colorId]);


  const swatchPrev = () => {
    if (swatchIndex >= 5) {
      setSwatchSlide(0)
      // only use 'swatchIndex' to track the page number to control visibility of 'prev'/'next' buttons
      setSwatchIndex(swatchIndex - 5)
    }
  }

  const swatchNext = () => {
    if (swatchIndex + 5 <= product.swatches.length) {
      setSwatchIndex(swatchIndex + 5)
      // consider the whole 'swatchesGroupSlider' as 100%, break it up to slider pages based on swatches length
      setSwatchSlide(`-${100 / Math.ceil(product.swatches.length / 5)}`)
    }
  }

  const handleNavigate = () => {
    navigate(`product/${product.productId}?colorId=${colorId}`)
  }

  return <div className='productCard'>
    {/* MUST check if 'img' exist, otherwise 'img[0]' will raise error */}
    {images
      && <img className="productImage"
              src={images[mainImageIndex]}
              alt={product.name}
              onMouseEnter={() => setMainImageIndex(1)}
              onMouseLeave={() => setMainImageIndex(0)}
              onClick={handleNavigate}
      ></img>}
    <div className='productSwatches'>
      {product.swatches.length > 5
        && <button className="swatchesPrev"
                   onClick={swatchPrev}
                   disabled={swatchIndex <= 0}>{'<'}</button>}
      <div className="swatchesGroup">
        <div className="swatchesGroupSlider"
             style={{
               width: `${Math.ceil(product.swatches.length / 5) * 100}%`,
               transform: `translateX(${swatchSlide}%)`
             }}
        >
          {product.swatches
            // render all swatches and make the width refer to the sliding window
            // then use 'translateX' to shift 'swatchesGroupSlide' to the left/right to achieve the animation
            .map((item, index) => {
              if (item.colorId === colorId) {
                return <div
                  key={`swatch-${index}`}
                  className='swatchSelected'
                  style={{background: `url(${item.url})`}}
                  onMouseEnter={() => setColor(item.colorId)}
                  onClick={handleNavigate}
                ></div>
              } else {
                return <div
                  key={`swatch-${index}`}
                  className='swatch'
                  style={{background: `url(${item.url})`}}
                  onMouseEnter={() => {
                    setColor(item.colorId)
                  }}
                  onClick={handleNavigate}
                ></div>
              }
            })}
        </div>
      </div>
      {product.swatches.length > 5
        && <button className="swatchesNext"
                   onClick={swatchNext}
                   disabled={swatchIndex + 5 >= product.swatches.length}>{'>'}</button>}
    </div>
    <div className="productInfo">
      <div className="name">{product.name}</div>
      <div className="price">{`$ ${product.price}`}</div>
    </div>
  </div>
}
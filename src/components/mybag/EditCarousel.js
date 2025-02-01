import './EditCarousel.css'
import React from 'react';
import {useEffect, useState} from "react";
export const EditCarousel = ({product, colorSelected}) => {
  const [imgId, setImgId] = useState(0)
  const [colorId, setColorId] = useState(colorSelected)
  const [imgList, setImgList] = useState([])

  useEffect(() => {
    const currentCarousel = product?.mainCarousel.find(c =>
      c.colorId === colorSelected
    )

    if (currentCarousel) {
      setImgList(currentCarousel.images)
    }
  }, [colorId, product]);

  return <div className='cardCarousel'>
    <img src={imgList[imgId]} alt=""/>
    <div className="arrows">
      {imgId > 0 &&
        <div className="arrowBefore" onClick={() =>
          imgId > 0 && setImgId(imgId - 1)}>
          {'<'}
        </div>
      }
      {imgId < imgList.length - 1 &&
        <div className="arrowNext" onClick={() =>
          imgId < imgList.length - 1 && setImgId(imgId + 1)}>
          {'>'}
        </div>
      }
    </div>
  </div>
}
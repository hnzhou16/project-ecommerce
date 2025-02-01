import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react"
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useState} from "react";
import './AddToCart.css'

// only need to pass the 'handleAddToBag' function
// do NOT need to pass all the color/size info
export const AddToBag = ({handleAddToBag}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className='addToBagContainer'>
      {/*<div className='ship'>*/}
      {/*  <label className='shipLabel' htmlFor="ship">*/}
      {/*    <input id='ship' type="radio"/> <h2>Ship it to me</h2>*/}
      {/*  </label>*/}
      {/*  <span>Free shipping and returns</span>*/}
      {/*</div>*/}
      <div className='pickupContainer'>
        {/*<div className='iconContainer'>*/}
        {/*  <StorefrontOutlinedIcon className='pickupIcon'/>*/}
        {/*  <h2>Pick up in store</h2>*/}
        {/*</div>*/}
        {/*<div className='expand'>*/}
        {/*  {isExpanded === false ?*/}
        {/*    <div className='addIcon' onClick={() => setIsExpanded(true)}><AddIcon/></div> :*/}
        {/*    <div className='removeIcon' onClick={() => setIsExpanded(false)}><RemoveIcon/></div>}*/}
        {/*</div>*/}
      </div>
      {/*{isExpanded === true && (*/}
      {/*  <div className='pickUpInfoContainer'>*/}
      {/*    <p>*/}
      {/*      It looks like we can't find your location. Tell us where you are so we can find stores near you!*/}
      {/*    </p>*/}
      {/*    <label htmlFor="locationInput">*/}
      {/*      <input type="radio" id='locationInput' className='locationInput'/> Westfield Mall (14 miles)*/}
      {/*    </label>*/}
      {/*  </div>)}*/}
      <div className='buttonContainer'>
        <button onClick={handleAddToBag}>ADD TO BAG</button>
      </div>
      {/*<div className='otherStoreContainer'>*/}
      {/*  <button>Check All Store Inventory</button>*/}
      {/*</div>*/}
    </div>
  )
}
import "./Men.css"
import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {clearFilter, filterGender, filterSelected} from "../../redux/actions/filterAction";
import {useNavigate} from "react-router-dom";

export const Men = ({handleHover}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const filterList = useSelector(state => state.filterReducer.filterList)


  return <div className="menHeader" onMouseLeave={() => handleHover(1, false)}>

    <div className="menContainerCol">
      <div className="title">
        MEN'S CLOTHES
      </div>

      <div className="menProducts">
        <div className="allMen"
             id='filterAnimation'
             onClick={() => {
               dispatch(clearFilter())
               dispatch(filterGender('Gender', 0))
               handleHover(1, false)
               navigate('/')
             }}
        >
          Shop All Men
        </div>
        {Object.keys(filterList).length > 0 &&
          filterList.Category.slice(0, filterList.Category.indexOf('Accessories'))
            .map((item, i) => {
              return item === 'Dresses & Skirts'
              ? <></>
              : <div className='list'
                          id='filterAnimation'
                          onClick={() => {
                            dispatch(clearFilter())
                            dispatch(filterGender('Gender', 0))
                            dispatch(filterSelected('Category', i))
                            handleHover(1, false)
                          }}
              >{item}</div>
            })}
      </div>
    </div>

    <div className="menContainerCol">
      <img src="https://project-ecommerce-images.s3.us-east-1.amazonaws.com/assets/men.jpg"
           alt="Men's Clothes"/>
    </div>

  </div>

}

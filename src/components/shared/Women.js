import "./Women.css"
import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {clearFilter, filterGender, filterSelected} from "../../redux/actions/filterAction";

export const Women = ({handleHover}) => {
  const dispatch = useDispatch()
  const filterList = useSelector(state => state.filterReducer.filterList)


  return <div className="womenHeader" onMouseLeave={() => handleHover(0, false)}>

    <div className="womenContainerCol">
      <div className="title">
        WOMEN'S CLOTHES
      </div>

      <div className="womenProducts">
        <div className="allWomen"
             id='filterAnimation'
             onClick={() => {
               dispatch(clearFilter())
               dispatch(filterGender('Gender', 1))
               handleHover(0, false)
             }}
        >
          Shop All Women
        </div>
        {Object.keys(filterList).length > 0 &&
          filterList.Category.slice(0, filterList.Category.indexOf('Accessories'))
            .map((item, i) => {
              return <div className='list'
                          id='filterAnimation'
                          onClick={() => {
                            dispatch(clearFilter())
                            dispatch(filterGender('Gender', 1))
                            dispatch(filterSelected('Category', i))
                            handleHover(0, false)
                          }}
              >{item}</div>
            })}
      </div>
    </div>

    <div className="womenContainerCol">
      <img src="https://project-ecommerce-images.s3.us-east-1.amazonaws.com/assets/women.jpg"
           alt="Women's Clothes"/>
    </div>

  </div>

}

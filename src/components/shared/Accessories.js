import "./Accessories.css"
import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {clearFilter, filterSelected} from "../../redux/actions/filterAction";

export const Accessories = ({handleHover}) => {
    const dispatch = useDispatch()
    const filterList = useSelector(state => state.filterReducer.filterList)


    return <div className="acceHeader" onMouseLeave={() => handleHover(2, false)}>

        <div className="acceContainerCol">
            <div className="title">
                ACCESSORIES
            </div>

            <div className="acceProducts">
                <div className="allAcce"
                     id='filterAnimation'
                     onClick={() => {
                         dispatch(clearFilter())
                         dispatch(filterSelected('Category', Object.keys(filterList.Category).length - 1))
                         handleHover(2, false)
                     }}>
                    Shop All Accessories
                </div>
            </div>
        </div>

        <div className="acceContainerCol">
            <img src="https://project-ecommerce-images.s3.us-east-1.amazonaws.com/assets/accessories.jpg"
                 alt="Accessories's Clothes"/>
        </div>

    </div>

}

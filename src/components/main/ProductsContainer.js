import './ProductsContainer.css';
import React from 'react';
import {useSelector} from "react-redux";
import {ProductCard} from "./ProductCard";
import {FilterCheckedButton} from "./FilterCheckedButton";

export const ProductsContainer = () => {
    const productList = useSelector(state => state.filterReducer.productList)
    const checkedItems = useSelector(state => state.filterReducer.checkedItems)

    return <div className='mainProducts'>
        {Object.keys(checkedItems).length > 0 &&
          <div className="filterStatus">
              {/* can NOT directly use for loop in return, MUST use Object.entries to turn all key-value paris into array*/}
              {Object.entries(checkedItems).map(([name, {group, index}]) => {
                  return <FilterCheckedButton key={`checkedButton-${index}`} name={name} group={group} index={index}/>
              })
              }
          </div>
        }
        {/* MUST make sure 'productList' exist, otherwise 'map' function will raise error */}
        {productList.length > 0
          && productList.map((item, i) =>
            <ProductCard key={`${item.productId}-${i}`} product={item}/>)}
    </div>
}
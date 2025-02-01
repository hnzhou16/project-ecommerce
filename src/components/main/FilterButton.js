import './FilterButton.css'
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {filterSelected} from "../../redux/actions/filterAction";
import {useState} from "react";

export const FilterButton = ({group, detail, index}) => {
  const dispatch = useDispatch()
  const checkedItems = useSelector(state => state.filterReducer.checkedItems)

  if (group === 'Size') {
    if (String(detail).startsWith('SIZE_DIVIDER')) {
      return <hr className='filterSizeDivider'/>
    } else {
      return (
        <input className={`filterGroupSizeButton ${Object.keys(checkedItems).includes(detail) ? 'sizeSelected' : ''}`}
               type="button"
               key={`size-${index}`}
               value={detail}
               onClick={() => dispatch(filterSelected(group, index))}/>
      )
    }
  } else if (group === 'Color') {
    return (
      <div key={`color-${index}`}
           className='filterGroupColorButtons'
           onClick={() => dispatch(filterSelected(group, index))}
      >
        {/* !!! if using 'input', it has an onClick action automatically (event bubbling), MUST stopPropagation to prevent double dispatch */}
        <img className={Object.keys(checkedItems).includes(detail[0]) ? 'swatchSelected' : 'swatchUnselected'}
             src={detail[1]}
             alt={detail[0]}
        />
        <div className='swatchName'>{detail[0]}</div>
      </div>
    )
  } else {
    return (
      <div key={`checkbox-${index}`} className='filterGroupCheckboxButtons'>
        {/* 'dispatch', directly pass in value as (group, index),
                NOT (group={group}, index={index}) --> will be passed as object this way */}
        <input type='checkbox'
               id='checkbox'
               value={detail}
               checked={Object.keys(checkedItems).includes(detail)}
               onClick={() => dispatch(filterSelected(group, index))}/>
        <label htmlFor="checkbox">{detail}</label>
      </div>
    )
  }
}
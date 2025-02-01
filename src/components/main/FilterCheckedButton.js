import './FilterCheckedButton.css'
import React from 'react';
import {useDispatch} from "react-redux";
import {filterSelected} from "../../redux/actions/filterAction";

export const FilterCheckedButton = ({name, group, index}) => {
  const dispatch = useDispatch()
  return (<div className='filterStatusBtn'
               onClick={() => dispatch(filterSelected(group, index))}>
      <div className="filterStatusName">{name}</div>
      <div className="filterStatusAction">{'x'}</div>
  </div>)
}
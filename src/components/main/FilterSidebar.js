import React from 'react';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import './FilterSideBar.css'
import {fetchFilter, fetchFilteredProducts} from "../../redux/actions/filterAction";
import {FilterButton} from "./FilterButton";

export const FilterSidebar = ({ isMobileFilterOpen, toggleMobileFilter }) => {
  const dispatch = useDispatch()

  const requestBody = useSelector(state => state.filterReducer.requestBody)
  const filterList = useSelector(state => state.filterReducer.filterList)

  const [filterExpand, setFilterExpand] = useState([])
  const [viewMore, setViewMore] = useState([])

  // dispatch in the dependency is not necessary
  // it assumes that all variables or functions used inside the effect might change and should be added to the dependency array
  useEffect(() => {
    dispatch(fetchFilter())
  }, []);

  useEffect(() => {
    dispatch(fetchFilteredProducts(requestBody))
  }, [requestBody]);

  // MUST add useEffect to get 'filterList.length', otherwise it will be empty before fetch and pass into 'Array'
  useEffect(() => {
    setFilterExpand(Array(Object.keys(filterList).length).fill(true))
    setViewMore(Array(Object.keys(filterList).length).fill(false))
  }, [filterList]);

  // must use 'map' to go through ALL items to flip the target one
  const clickExpand = (index) => {
    setFilterExpand(prevState =>
      prevState.map((isVisible, i) => i === index ? !isVisible : isVisible))
  }

  const clickViewMore = (index) => {
    setViewMore(prevState =>
      prevState.map((isMore, i) => i === index ? !isMore : isMore))
  }

  return <div className={`filterSideBar ${isMobileFilterOpen ? 'filterSideBarMobileOpen' : ''}`}>
    {/* Mobile filter header */}
    <div className="mobileFilterHeader">
      <h3>Filters</h3>
      <button className="mobileFilterClose" onClick={toggleMobileFilter}>×</button>
    </div>
    {filterList
      && Object.keys(filterList).map((group, index) => {
        const isVisible = filterExpand[index]
        const isMore = viewMore[index]

        return (
          <div key={`group-${index}`} className='filterGroup'>
            <div className='filterGroupTitle' onClick={() => clickExpand(index)}>
              <div className={isVisible ? 'filterGroupNameBold' : 'filterGroupName'}>{group}</div>
              <div className='filterToggle' key={group}>
                {isVisible
                  // to make '+' and '-' all equal, must use '|' symbol for both vertical and horizontal
                  // when expanding, | rotate from | to -
                  ? <div className='filterToggleHorizontal'>|</div>
                  : <div>
                    <div className='filterToggleStatic'>|</div>
                    {/* when contracting, | rotate from - to | */}
                    <div className='filterToggleVertical'>|</div>
                  </div>}
              </div>
            </div>

            {/* check the group name BEFORE rendering 'div', otherwise there'll be an empty div after each 'filterGroupTitle'*/}
            {group === 'Size'
              && isVisible
              // build a 'div' BEFORE map, to put these into corresponding className
              && <div className="filterGroupSize">
                {filterList[group].map((detail, index) => {
                    // must assign unique 'key' to outermost returned components <FilterButton/>
                    return <FilterButton key={`filter${group}-${index}`} group={group} detail={detail}
                                         index={index}/>
                  }
                )}
              </div>
            }

            {group === 'Color'
              && isVisible
              && <div className="filterGroupColor">
                {filterList[group].map((detail, index) => {
                    return <FilterButton key={`filter-${group}-${index}`} group={group} detail={detail}
                                         index={index}/>
                  }
                )}
              </div>}

            {group !== 'Size'
              && group !== 'Color'
              && isVisible
              && <div>
                <div className="filterGroupInput">
                  {filterList[group]
                    // use 'slice' to do the 'viewMore' toggle
                    // use filterList[group] to get the length NOT 'group', 'group' is a string
                    .slice(0, (isMore ? filterList[group].length : 5))
                    .map((detail, index) => {
                        return <FilterButton key={`filter-${group}-${index}`} group={group} detail={detail}
                                             index={index}/>
                      }
                    )}
                </div>
                {filterList[group].length > 5
                  && <div
                    className='filterViewMore'
                    onClick={() => {
                      clickViewMore(index)
                    }}>{isMore ? 'View Less -' : 'View More +'}
                  </div>
                }
              </div>
            }

          </div>
        )
      })}
  </div>
}

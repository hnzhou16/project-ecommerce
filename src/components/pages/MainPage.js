import './MainPage.css'
import React from "react"
import {FilterSidebar} from "../main/FilterSidebar";
import {ProductsContainer} from "../main/ProductsContainer";
import {useEffect, useRef, useState} from "react";
import {Header} from "../shared/Header";
import {Footer} from "../shared/Footer";
import {ChatModal} from "../AI/ChatModal";
import {useDispatch} from "react-redux";
import {setChatOpen} from "../../redux/actions/AIAction";
import {clearFilter} from "../../redux/actions/filterAction";

export const MainPage = () => {
  const dispatch = useDispatch()
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const sentinelRef = useRef(null); // set up for the empty div in 'return'

  useEffect(() => {
    const sentinel = sentinelRef.current;
    // An IntersectionObserver monitors the visibility of the sentinel element relative to its viewport (root).
    const observer = new IntersectionObserver(
      ([entry]) => {
        // callback is called whenever the sentinel visibility changes
        // if sentinel and viewport 'isIntersecting', set false to isSticky
        setIsSticky(!entry.isIntersecting);
      },
      {
        root: null, // Observes the sentinel relative to the browser's viewport.
        threshold: 0,
      }
    );

    // define the 'entry' here
    if (sentinel) {
      observer.observe(sentinel);
    }

    dispatch(setChatOpen(false))
    dispatch(clearFilter())

    // Lifecycle: clean up (disconnect) observer when the component unmounted (clear up memory to save space and CPU)
    // unmount happens when 1. Navigate to another page 2. Conditional rendering 3. Close the tab
    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, []);

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <>
      {/* use sentinel to control if the header is sticky */}
      <div ref={sentinelRef}></div>
      <Header isSticky={isSticky}/>
      {/* use unique className for main otherwise styling will be overwritten */}
      <div className="mainPage">
        <FilterSidebar isMobileFilterOpen={isMobileFilterOpen} toggleMobileFilter={toggleMobileFilter}/>
        <ProductsContainer toggleMobileFilter={toggleMobileFilter}/>
      </div>
      {/* Mobile filter overlay */}
      {isMobileFilterOpen && <div className="mobileFilterOverlay" onClick={toggleMobileFilter}></div>}
      <ChatModal/>
      <Footer/>
    </>
  )
}

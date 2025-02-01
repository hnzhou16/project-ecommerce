import './Reviews.css'
import {ReviewCard} from "./ReviewCard";
import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchReviews, reviewSort} from "../../redux/actions/reviewsAction";

const star_1_3 = "https://project-ecommerce-images.s3.us-east-1.amazonaws.com/assets/star_1_3.svg";
const star_4_5 = "https://project-ecommerce-images.s3.us-east-1.amazonaws.com/assets/star_4_5.svg";
const star_6_8 = "https://project-ecommerce-images.s3.us-east-1.amazonaws.com/assets/star_6_8.svg";
const star_10 = "https://project-ecommerce-images.s3.us-east-1.amazonaws.com/assets/star_10.svg";

export const Reviews = () => {
  const dispatch = useDispatch()
  const reviews = useSelector(state => state.reviewsReducer.reviews)

  const changeHandler = (e) => {
    dispatch(reviewSort(e.target.value))
  }

  useEffect(() => {
    dispatch(fetchReviews())
  }, []);

  return (<div className='reviewsWrapper'>

    <div className='reviews'>
      <div className="reviewsHeader">
        <div className="reviewsHeaderTitle">
          Reviews
        </div>
        <div className="reviewsHeaderDetails">
          <div className="reviewsHeaderDetailsRating">
            <div className="stars">
              4.5
              <div className="starsAll">
                <img src={star_10} alt=""/>
                <img src={star_10} alt=""/>
                <img src={star_10} alt=""/>
                <img src={star_10} alt=""/>
                <img src={star_4_5} alt=""/>
              </div>
            </div>
            <div className="count">
              Based on {reviews.length} Reviews
            </div>
          </div>
          <div className="reviewsHeaderDetailsSize">
            <div className="reviewsHeaderDetailSizeSum">
              Fits true to size
            </div>
            <div className="reviewsHeaderDetailsSizeRange">
              Smaller
              <div className="rangeBars">
                <div className="range"></div>
                <div className="range"></div>
                <div className="range black"></div>
                <div className="range"></div>
                <div className="range"></div>
              </div>
              Larger
            </div>
          </div>

        </div>
      </div>
      <div className="reviewsSection">

        <div className="reviewsContent">
          <div className="reviewsSum">
            <div className="reviewsSumCount">
              Showing {reviews.length} results
            </div>
            <div className="reviewsSumSort">
              <label htmlFor="sort">Sort by: </label>
              <select name="sort" id="sort" onChange={changeHandler}>
                <option value="Most Recent">Most Recent</option>
                <option value="Most Helpful">Most Helpful</option>
                <option value="Highest to Lowest Rating">Highest to Lowest Rating</option>
                <option value="Lowest to Highest Rating">Lowest to Highest Rating</option>
              </select>
            </div>
          </div>
          <div className="reviewCards">
            {reviews.length > 0
              && reviews.map((item, index) => <ReviewCard
                key={index}
                index={index}
                date={item.date}
                helpful={item.helpful}
                size={item.size}
                name={item.name}
                rating={item.rating}
                title={item.title}
                comment={item.comment}/>)}
          </div>
        </div>
      </div>
    </div>
  </div>)
}
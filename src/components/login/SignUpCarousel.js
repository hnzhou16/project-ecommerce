import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './SignUpCarousel.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import React from 'react';
import {useNavigate} from "react-router-dom";

export const SignUpCarousel = () => {
  const navigate = useNavigate()

  const carouselSettings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleGoBackHome = () => {
    navigate("/");
  };

  return (
    <div className="signUpImageGallery">
      <div className="back-button-container">
        <button
          className="back-button"
          aria-label="Back"
          onClick={handleGoBackHome}
        >
            <span className="arrow"><KeyboardBackspaceIcon/></span>
          <span className="text">BACK</span>
        </button>
      </div>
      {/* make sure the slick.css files are imported */}
      <Slider {...carouselSettings}>
        <div className="slide">
          <img
            src="https://project-ecommerce-images.s3.us-east-1.amazonaws.com/assets/signin_carousel_1.jpeg"
            alt="Image"
          />
        </div>
        <div className="slide">
          <img
            src="https://project-ecommerce-images.s3.us-east-1.amazonaws.com/assets/signin_carousel_2.jpeg"
            alt="Image"
          />
        </div>
      </Slider>
    </div>
  )
}
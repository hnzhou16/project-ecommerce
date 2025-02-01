import "./ChatModal.css"
import {ProductSearch} from "./ProductSearch";
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setChatOpen} from "../../redux/actions/AIAction";

export const ChatModal = () => {
  const dispatch = useDispatch()
  const chat_icon = "https://project-ecommerce-images.s3.us-east-1.amazonaws.com/assets/chat.png"
  const arrow_down_icon = "https://project-ecommerce-images.s3.us-east-1.amazonaws.com/assets/arrow_down.png"

  const isChatOpen = useSelector(state => state.AIReducer.isChatOpen)

  const onOpen = () => {
    dispatch(setChatOpen(true))
  }

  const onClose = () => {
    dispatch(setChatOpen(false))
  }


  return <div className="modalHelpBox">
    <div className="modalContainer">
      {!isChatOpen &&
        <button onClick={onOpen} className="helpButton">
          <img className="helpIcon" src={chat_icon} alt=""/>
        </button>
      }
      {isChatOpen &&
        <div className="helpBoxAI">
          <div className="helpBoxNavBar">
            <div className="helpBoxNavBarCell">
              <img
                src="https://project-ecommerce-images.s3.us-east-1.amazonaws.com/assets/logo_hz.png"
                alt="logo" className="helpBoxLogo"
              />
              <div className="helpBoxNavBarTitle">
                Live Chat
              </div>
            </div>
            <div className="helpBoxNavBarCell alignRight">
              <button onClick={onClose} className="topbarButton">
                <img className="topbarIcon" src={arrow_down_icon} alt=""/>
              </button>
            </div>
          </div>
          <div className="helpBoxGradient">
          </div>
          <ProductSearch />
        </div>
      }
    </div>
  </div>
}


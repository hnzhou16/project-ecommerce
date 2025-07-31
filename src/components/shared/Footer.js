import React from 'react';
import "./Footer.css";
import "../../assets/instagram.png"

export const Footer = () => {
  return (<>
    <div className="footer">
      <div className="footContainer">
        <div className="title">
          <div>CONTACT US</div>
        </div>

        <ul className="imgContainer">
          <img
            src="https://icons.iconarchive.com/icons/custom-icon-design/mono-general-3/512/twitter-icon.png"
            alt=""/>
          <img
            src="https://images.vexels.com/media/users/3/131766/isolated/preview/94f495f92a4b9aa1e7714db80856358e-pinterest-flat-icon.png"
            alt=""/>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/YouTube_play_buttom_dark_icon_%282013-2017%29.svg/1200px-YouTube_play_buttom_dark_icon_%282013-2017%29.svg.png"
            alt=""/>
          <img
            src="https://i.pinimg.com/736x/d5/f1/6a/d5f16a0164862cf8270a71136d0cc50d.jpg" alt=""/>
          <img
            src="https://media.discordapp.net/attachments/853703320711462973/1250970914225393724/grQQPA3N0SGAAIIIIAAAggggAACCCCAgDcCNBC8SQWBIIAAAggggAACCCCAAAIIIOCvwH8BxKqau43WAP4AAAAASUVORK5CYII.png?ex=666ce0f3&is=666b8f73&hm=071d1c7404a848a1f7d1f5d3f20a57506215c9f52702f9f607b7bea003096c82&=&format=webp&quality=lossless&width=1574&height=1108"
            alt=""/>
        </ul>
      </div>
      <a href="https://www.gap.com/">
        * Products information and images sourced from: https://www.gap.com/.
      </a>
    </div>

  </>);
};

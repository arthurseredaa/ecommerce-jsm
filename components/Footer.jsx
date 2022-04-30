import React from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 - JSM Store. All rights reserved</p>

      <p className="icons">
        <AiFillInstagram className='icon-item' />
        <AiOutlineTwitter className='icon-item' />
      </p>
    </div>
  );
};

export default Footer;

import React from 'react';
import Link from 'next/link';

const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">SMALL TEXT</p>
        <h3>MIDDLE TEXT</h3>
        <h1>LARGE TEXT ONE</h1>
        <img src="" alt="Product image" className="hero-banner-image" />
        <div>
          <Link href={'/product/ID'} passHref>
            <button type="button">BUTTON TEXT</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>DESCRIPTION</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

import React from 'react';
import Link from 'next/link';
import { getSanityImageUrl } from '../lib/sanityClient';

const FooterBanner = ({ banner }) => {
  const {
    discount,
    largeText,
    saleTime,
    description,
    smallText,
    midText,
    buttonText,
    product,
    image,
  } = banner;

  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{description}</p>
          <Link href={`/product/${product}`} passHref>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        <img
          src={getSanityImageUrl(image)}
          alt={smallText}
          className="footer-banner-image"
        />
      </div>
    </div>
  );
};

export default FooterBanner;

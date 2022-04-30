/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { getSanityImageUrl } from '../lib/sanityClient';

const HeroBanner = ({ banner }) => {
  const {
    buttonText,
    description,
    discount,
    largeText,
    midText,
    product,
    saleTime,
    smallText,
    image,
  } = banner;
  return (
    <div className="hero-banner-container">
      <p className="beats-solo">{smallText}</p>
      <h3>{midText}</h3>
      <h1>{largeText}</h1>
      <img
        src={getSanityImageUrl(image)}
        alt="Product image"
        className="hero-banner-image"
      />

      <div>
        <div>
          <Link href={`/product/${product}`} passHref>
            <button type="button">{buttonText}</button>
          </Link>

          <p className="discount">
            {discount} {saleTime}
          </p>
        </div>
        <div className="desc">
          <h5>Description</h5>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

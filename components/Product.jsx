/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { getSanityImageUrl } from '../lib/sanityClient';

const Product = ({ product }) => {
  if (!product) return;

  const { image, name, slug, price } = product;
  const imageLink = getSanityImageUrl(image[0]);

  return (
    <Link passHref href={`/product/${slug.current}`}>
      <div className="product-card">
        <img src={imageLink} alt={name} className="product-image" width={250} height={250} />
        <p className='product-name'>{name}</p>
        <p className='product-price'>${price}</p>
      </div>
    </Link>
  );
};

export default Product;

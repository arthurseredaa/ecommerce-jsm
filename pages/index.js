import React from 'react';
import { FooterBanner, HeroBanner, Product } from '../components';

const products = ['Product 1', 'Product 2'];

const Home = () => {
  return (
    <>
      <HeroBanner />
      <div className="products-heading">
        <h2>Best seeling products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products.map((product) => (
          <div key={product}>{product}</div>
        ))}
        <Product />
      </div>
      <FooterBanner />
    </>
  );
};

export default Home;

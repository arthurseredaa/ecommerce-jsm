import React from 'react';
import { FooterBanner, HeroBanner, Product } from '../components';
import { client } from '../lib/sanityClient';

const Home = ({ banner, products }) => (
  <>
    {banner && <HeroBanner banner={banner} />}
    <div className="products-heading">
      <h2>Best selling products</h2>
      <p>Speakers of many variations</p>
    </div>
    <div className="products-container">
      {products &&
        products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      <Product />
    </div>
    {banner && <FooterBanner banner={banner} />}
  </>
);

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const bannerQuery = '*[_type == "banner"]';

  const products = await client.fetch(productQuery);
  const banners = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      banner: banners[0],
    },
  };
};

export default Home;

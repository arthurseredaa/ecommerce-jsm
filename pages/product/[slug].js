/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext } from 'react';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
  AiFillStar,
} from 'react-icons/ai';
import Product from '../../components/Product';
import { client, getSanityImageUrl } from '../../lib/sanityClient';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, similarProducts }) => {
  const {
    increaseQuantity,
    decreaseQuantity,
    quantity,
    handleAddProduct,
    setShowCart,
  } = useStateContext();
  const [currentImage, setCurrentImage] = useState(0);
  const image = product?.image;
  const name = product?.name;
  const price = product?.price;
  const details = product?.details;
  const [totalPrice, setTotalPrice] = useState(price);

  useEffect(() => {
    setTotalPrice(price * quantity);
  }, [price, quantity]);

  const handleCheckout = async () => {
    handleAddProduct(product);

    setShowCart(true);
  };

  const currentSanityImage =
    image?.[currentImage] && getSanityImageUrl(image[currentImage]);

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={currentSanityImage || ''}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={getSanityImageUrl(item)}
                className={
                  i === currentImage
                    ? 'small-image selected-image'
                    : 'small-image'
                }
                onMouseEnter={() => setCurrentImage(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${totalPrice}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decreaseQuantity}>
                <AiOutlineMinus />
              </span>
              <span className="num">{quantity}</span>
              <span className="plus" onClick={increaseQuantity}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => handleAddProduct(product)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleCheckout}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {similarProducts.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const query = `*[_type == "product"]`;
  const data = await client.fetch(query);

  const paths = data.map((item) => ({ params: { slug: item.slug.current } }));

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps = async ({ params: { slug } }) => {
  const productQuery = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const similarProductQuery = '*[_type == "product"]';

  const product = await client.fetch(productQuery);
  const similarProducts = await client.fetch(similarProductQuery);

  return {
    props: {
      product,
      similarProducts,
    },
  };
};

export default ProductDetails;

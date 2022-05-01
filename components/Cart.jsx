/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useRef } from 'react';
import Link from 'next/link';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useStateContext } from '../context/StateContext';
import { getSanityImageUrl } from '../lib/sanityClient';

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    changeProductQuantity,
    handleRemoveProduct,
  } = useStateContext();

  const handleCheckout = () => {
    console.log('checkout');
  };

  const handleDecreaseItemQuantity = (productId) => {
    changeProductQuantity(productId, '-');
  };

  const handleIncreaseProductQuantity = (productId) => {
    changeProductQuantity(productId, '+');
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/" passHref>
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              if (!item) return null;

              return (
                <div className="product" key={item._id}>
                  <img
                    src={getSanityImageUrl(item?.image?.[0])}
                    className="cart-product-image"
                  />
                  <div className="item-desc">
                    <div className="flex top">
                      <h5>{item.name}</h5>
                      <h4>${item.price}</h4>
                    </div>
                    <div className="flex bottom">
                      <div>
                        <p className="quantity-desc">
                          <span
                            className="minus"
                            onClick={() => handleDecreaseItemQuantity(item._id)}
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className="num" onClick="">
                            {item.quantity}
                          </span>
                          <span
                            className="plus"
                            onClick={() =>
                              handleIncreaseProductQuantity(item._id)
                            }
                          >
                            <AiOutlinePlus />
                          </span>
                        </p>
                      </div>
                      <buttons
                        type="button"
                        className="remove-item"
                        onClick={() => handleRemoveProduct(item._id)}
                      >
                        <TiDeleteOutline />
                      </buttons>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

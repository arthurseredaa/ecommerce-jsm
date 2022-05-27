import { useEffect, useState, useContext, createContext } from 'react';

import { toast } from 'react-hot-toast';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddProduct = (product) => {
    const isProductInCart = cartItems.find((item) => item._id === product._id);
    setTotalPrice((prevPrice) => prevPrice + product.price * quantity);

    if (isProductInCart) {
      const updatedCartItems = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );

      setCartItems(updatedCartItems);
    } else {
      setTotalQuantities(totalQuantities + 1);

      product.quantity = quantity;

      setCartItems([...cartItems, product]);
    }

    toast.success(`${quantity} ${product.name} added to the cart!`);
  };

  const handleRemoveProduct = (productId) => {
    setTotalQuantities(totalQuantities - 1);
    setCartItems((prevState) =>
      prevState.filter((item) => item._id !== productId)
    );
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const changeProductQuantity = (productId, action = '+') => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.quantity === 1 && action === '-') return item;

      const currentQuantity =
        action === '-' ? item.quantity - 1 : item.quantity + 1;

      if (productId === item._id) {
        return { ...item, quantity: currentQuantity };
      } else {
        return item;
      }
    });

    setCartItems(updatedCartItems);
  };

  useEffect(() => {
    const allPrices = cartItems.map((item) => ({
      id: item._id,
      price: item.quantity * item.price,
    }));

    const subtotal = allPrices.reduce(
      (prevValue, nextValue) => prevValue + nextValue.price,
      0
    );

    setTotalPrice(subtotal);
  }, [cartItems]);

  return (
    <StateContext.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        quantity,
        setShowCart,
        decreaseQuantity,
        increaseQuantity,
        handleAddProduct,
        changeProductQuantity,
        handleRemoveProduct,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

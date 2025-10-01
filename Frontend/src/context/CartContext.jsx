import React, { createContext, useState, useContext } from 'react';

// 1. Create the context
const CartContext = createContext();

// 2. Create a custom hook for easy access to the context
export const useCart = () => useContext(CartContext);

// 3. Create the Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState(null);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if the item is already in the cart
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // If it exists, just increase the quantity
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If it's a new item, add it to the cart with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };
  
  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Function to increase quantity
  const increaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease quantity
  const decreaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // This is the new function to empty the cart after an order is placed
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate the total price of all items in the cart
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // The value that will be available to all consuming components
  const value = {
    cartItems,
    shippingAddress, // 2. Export the address
    setShippingAddress, // 3. Export the function to set it
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,    // Export the new function
    cartTotal     // Export the calculated total
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
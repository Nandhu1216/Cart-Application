import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [checkoutMessage, setCheckoutMessage] = useState('');

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + parseFloat(item.cost.substring(1)) * item.quantity, 0).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    setCheckoutMessage('Order placed successfully! Thank you for shopping with Paradise Nursery.');
    
    // Clear cart and redirect to home after 3 seconds so user can see success message
    setTimeout(() => {
        dispatch(clearCart());
        window.location.reload();
    }, 3000);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        
        {checkoutMessage && (
            <div className="checkout-success-message">
                ✅ {checkoutMessage}
            </div>
        )}

        <h2 className="cart-header">Total Amount: ${calculateTotalAmount()}</h2>
        <div>
          {cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Price: {item.cost}</div>
                
                <div className="cart-actions">
                  <div className="cart-item-quantity">
                    <button className="cart-item-button" onClick={() => handleDecrement(item)}>-</button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button className="cart-item-button" onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  
                  <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
                  
                  <button className="cart-item-delete" onClick={() => handleRemove(item)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', fontSize: '1.2rem', color: '#666' }}>
              Your cart is currently empty.
            </div>
          )}
        </div>
        
        <div className="continue_shopping_btn">
          <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
          <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

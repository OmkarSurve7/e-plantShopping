import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const parseItemCostToInteger = (itemCost) => {
    return parseInt(itemCost.replace('$', ''), 10);
  };

  const calculateTotalAmount = () => {
    let totalCost = 0;
    cart.forEach((item) => {
      const itemCost = parseItemCostToInteger(item.cost);
      totalCost += itemCost * item.quantity;
    });
    return totalCost;
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleIncrement = (item) => {
    const updatedItem = { ...item };
    updatedItem.quantity++;
    dispatch(updateQuantity(updatedItem));
  };

  const handleDecrement = (item) => {
    const updatedItem = { ...item };
    if (updatedItem.quantity === 1) {
      dispatch(removeItem(updatedItem));
    } else {
      updatedItem.quantity--;
      dispatch(updateQuantity(updatedItem));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  const calculateTotalCost = (item) => {
    const itemCost = parseItemCostToInteger(item.cost);
    return item.quantity * itemCost;
  };

  const toastStyle = {
    position: 'fixed',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '16px 32px',
    borderRadius: '8px',
    fontSize: '18px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    zIndex: 9999,
    transition: 'all 0.3s ease',
    opacity: showToast ? 1 : 0,
    visibility: showToast ? 'visible' : 'hidden',
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Shopping Cart</h2>
      <p>
        <strong>Total Cart Amount: ${calculateTotalAmount()}</strong>
      </p>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map(item => (
          <div key={item.name} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit Price: {item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <button onClick={handleContinueShopping} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Continue Shopping
        </button>
        <button onClick={handleCheckoutShopping} style={{ padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Checkout
        </button>
      </div>

      {/* Toast Notification */}
      <div style={toastStyle}>
        🛒 Checkout coming soon! We are working on it. 🌿
      </div>
    </div>
  );
};

export default CartItem;
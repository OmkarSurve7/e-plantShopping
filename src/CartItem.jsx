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
    if (cart.length === 0) {
      alert('🛒 Your cart is empty. Add some plants first!');
      return;
    }
    alert('🛒 Checkout Coming Soon! We are working on it. 🌿');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleIncrement = (item) => {
    if (!item || !item.name) {
      console.error('Invalid item');
      return;
    }
    try {
      const updatedItem = { ...item };
      updatedItem.quantity++;
      dispatch(updateQuantity(updatedItem));
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('⚠️ Unable to update quantity. Please try again.');
    }
  };

  const handleDecrement = (item) => {
    if (!item || !item.name) {
      console.error('Invalid item');
      return;
    }
    try {
      const updatedItem = { ...item };
      if (updatedItem.quantity === 1) {
        dispatch(removeItem(updatedItem));
      } else {
        updatedItem.quantity--;
        dispatch(updateQuantity(updatedItem));
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('⚠️ Unable to update quantity. Please try again.');
    }
  };

  const handleRemove = (item) => {
    try {
      dispatch(removeItem(item));
    } catch (error) {
      console.error('Error removing item:', error);
      alert('⚠️ Unable to remove item. Please try again.');
    }
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
    backgroundColor: '#ff6b6b',
    color: 'white',
    padding: '18px 36px',
    borderRadius: '12px',
    fontSize: '20px',
    fontWeight: 'bold',
    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
    zIndex: 9999,
    transition: 'all 0.4s ease-in-out',
    opacity: showToast ? 1 : 0,
    visibility: showToast ? 'visible' : 'hidden',
    border: '2px solid #fff',
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <p>
        <strong>Total Cart Amount: ${calculateTotalAmount()}</strong>
      </p>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p className="cart-empty-icon">🛒 Your cart is empty.</p>
          <p className="cart-empty-text">Browse our plants and add your favorites!</p>
          <button 
            onClick={handleContinueShopping} 
            className="cart-start-shopping-btn"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        cart.map(item => (
          <div key={item.name} className="cart-item-card">
            <img src={item.image} alt={item.name} className="cart-item-img" />
            <div className="cart-item-info">
              <div className="cart-item-title">{item.name}</div>
              <div className="cart-item-price">Unit Price: {item.cost}</div>
              <div className="cart-item-qty">
                <button className="cart-item-qty-btn" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-qty-value">{item.quantity}</span>
                <button className="cart-item-qty-btn" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total-cost">
                Total: ${calculateTotalCost(item)}
              </div>
              <button className="cart-item-delete-btn" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      <div className="cart-actions">
        <button onClick={handleContinueShopping} className="cart-continue-btn">
          Continue Shopping
        </button>
        <button onClick={handleCheckoutShopping} className="cart-checkout-btn">
          Checkout
        </button>
      </div>

      {/* Enhanced Toast Notification */}
      <div style={toastStyle}>
        🌿 Thank you for shopping! Checkout will be available soon. Stay tuned! 🛒
      </div>
    </div>
  );
};

export default CartItem;
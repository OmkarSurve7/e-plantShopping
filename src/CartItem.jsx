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
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Shopping Cart</h2>
      <p>
        <strong>Total Cart Amount: ${calculateTotalAmount()}</strong>
      </p>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p style={{ fontSize: '24px' }}>🛒 Your cart is empty.</p>
          <p style={{ color: '#888' }}>Browse our plants and add your favorites!</p>
          <button 
            onClick={handleContinueShopping} 
            style={{ marginTop: '20px', padding: '12px 30px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}
          >
            Start Shopping
          </button>
        </div>
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

      {/* Enhanced Toast Notification */}
      <div style={toastStyle}>
        🌿 Thank you for shopping! Checkout will be available soon. Stay tuned! 🛒
      </div>
    </div>
  );
};

export default CartItem;
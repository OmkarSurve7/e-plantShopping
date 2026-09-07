// src/CheckoutModal.jsx
import React from 'react';
import './CheckoutModal.css';

const CheckoutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-icon">🌿</div>
        <h2 className="modal-title">Coming Soon!</h2>
        <p className="modal-text">
          The checkout feature is under development.<br />
          We're working hard to bring you a seamless shopping experience.
        </p>
        <p className="modal-text" style={{ fontSize: '14px', color: '#888' }}>
          Please check back later!
        </p>
        <button className="modal-button" onClick={onClose}>
          Got it!
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;
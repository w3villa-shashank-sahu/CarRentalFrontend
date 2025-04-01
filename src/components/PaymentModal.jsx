import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../utils/const';

function PaymentModal({ rental, onClose, onSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  let diffDays=0;
  
  const calculateAmount = () => {
    const startDate = new Date(rental.rental_date);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - startDate);
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const dailyRate = rental.price_per_day || 50;
    return Math.max(1, diffDays) * dailyRate;
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      setError('');
      
      const returnDate = new Date().toISOString().split('T')[0];
      const amount = calculateAmount();
      
      console.log('Processing payment:', {
        rentalId: rental.id,
        returnDate,
        amount
      });
      
      await axios.post(apiUrl + 'api/rentals/return', {
        rentalId: rental.id,
        returnDate: returnDate,
        totalPrice: amount
      });
      
      setIsProcessing(false);
      onSuccess();

    } catch (err) {
      setIsProcessing(false);
      setError(`Failed to process payment: ${err.message}`);
      console.error('Payment error:', err);
    }
  };

  const amount = calculateAmount();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Payment Due</h3>
          <button className="close-button" onClick={onClose}>X</button>
        </div>
        
        <div className="modal-body">
          <p>Car: {rental.car_brand} {rental.car_model}</p>
          <p>Customer: {rental.customer_name}</p>
          <p>Rental Start Date: {new Date(rental.rental_date).toLocaleDateString()}</p>
          <p>Return Date: {new Date().toLocaleDateString()} (Today)</p>
          <p>Rental Days: {diffDays}</p>
          
          <div className="amount-display">
            <h4>Total Amount Due:</h4>
            <span className="amount">{amount.toFixed(2)} Rs</span>
          </div>
          
          {error && <div className="error-message">{error}</div>}
        </div>
        
        <div className="modal-footer">
          <button className="secondary-button" onClick={onClose}>Cancel</button>
          <button 
            className="primary-button" 
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal; 
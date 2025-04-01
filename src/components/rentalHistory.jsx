import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RentalHistory = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRentalHistory();
  }, []);

  const fetchRentalHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/rentals/history');
      console.log('response', response.data);
      
      setRentals(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching rental history. Please try again later.');
      setLoading(false);
      console.error('Error:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading rental history...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ width: '20px', height: '20px' }}>
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </div>
    );
  }

  if (rentals.length === 0) {
    return <div className="empty-state">No rental history available.</div>;
  }

  return (
    <div className="card" style={{ marginTop: '25px' }}>
      <div className="card-header">
        <h2>Rental History</h2>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Car</th>
              <th>Rental Date</th>
              <th>Return Date</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr key={rental.id}>
                <td>{rental.name}</td>
                <td>{rental.brand} {rental.model}</td>
                <td>{new Date(rental.rental_date).toLocaleDateString()}</td>
                <td>
                  {rental.return_date 
                    ? new Date(rental.return_date).toLocaleDateString() 
                    : 'Not returned'}
                </td>
                <td>
                  {rental.total_price 
                    ? `$${parseFloat(rental.total_price).toFixed(2)}` 
                    : '-'}
                </td>
                <td>
                  <span className={`status-badge ${rental.return_date ? 'status-returned' : 'status-rented'}`}>
                    {rental.return_date ? 'Completed' : 'Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentalHistory;

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PaymentModal from './PaymentModal'
import { apiUrl } from '../utils/const'

const ActiveRentals = () => {
  const [activeRentals, setActiveRentals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedRental, setSelectedRental] = useState(null)

  useEffect(() => {
    fetchActiveRentals()
  }, [])

  const fetchActiveRentals = async () => {
    try {
      const response = await axios.get(apiUrl + 'api/rentals/active')
      console.log(response.data);
      setActiveRentals(response.data)
      setLoading(false)
    } catch (err) {
      setError('Error fetching active rentals. Please try again later.')
      setLoading(false)
      console.error('Error:', err)
    }
  }

  const handleReturnClick = (rental) => {
    setSelectedRental(rental)
  }

  const handleCloseModal = () => {
    setSelectedRental(null)
  }

  const handlePaymentSuccess = () => {
    fetchActiveRentals()
    setSelectedRental(null)
    window.location.reload()
  }

  if (loading) {
    return <div className="loading">Loading active rentals...</div>
  }

  if (error) {
    return (
      <div className="error-message">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ width: '20px', height: '20px' }}>
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </div>
    )
  }

  if (activeRentals.length === 0) {
    return <div className="empty-state">No active rentals at the moment.</div>
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Active Rentals</h2>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Car</th>
              <th>Rental Date</th>
              <th>Price Per Day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeRentals.map((rental) => (
              <tr key={rental.id}>
                <td>{rental.name}</td>
                <td>{rental.brand} {rental.model}</td>
                <td>{new Date(rental.rental_date).toLocaleDateString()}</td>
                <td>{rental.price_per_day}</td>
                <td>
                  <button 
                    className="action-button"
                    onClick={() => handleReturnClick(rental)}
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {selectedRental && (
        <PaymentModal 
          rental={selectedRental}
          onClose={handleCloseModal}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
}

export default ActiveRentals 
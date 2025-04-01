import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CarList = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cars')
      setCars(response.data)
      setLoading(false)
    } catch (err) {
      setError('Error fetching cars. Please try again later.')
      setLoading(false)
      console.error('Error:', err)
    }
  }

  if (loading) {
    return <div className="loading">Loading available cars...</div>
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

  if (cars.length === 0) {
    return <div className="empty-state">No cars available at the moment.</div>
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price/Day</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>Rs {car.price_per_day}</td>
              <td>
                <span className={`status-badge ${car.available ? 'status-available' : 'status-rented'}`}>
                  {car.available ? 'Available' : 'Rented'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CarList 
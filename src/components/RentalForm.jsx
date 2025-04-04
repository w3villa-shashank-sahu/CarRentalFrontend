import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { apiUrl } from '../utils/const'

const RentalForm = () => {
  const [formData, setFormData] = useState({
    customer_id: '',
    car_id: '',
    rental_date: new Date().toISOString().split('T')[0],
  })
  const [customers, setCustomers] = useState([])
  const [cars, setCars] = useState([])

  useEffect(() => {
    fetchCustomers()
    fetchAvailableCars()
  }, [])

  const fetchCustomers = async () => {
    try {
      const response = await axios.get( apiUrl + 'api/customers')
      setCustomers(response.data)
    } catch (error) {
      console.error('Error fetching customers:', error)
    }
  }

  const fetchAvailableCars = async () => {
    try {
      const response = await axios.get( apiUrl + 'api/cars')
      setCars(response.data)
    } catch (error) {
      console.error('Error fetching cars:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(apiUrl + 'api/rentals', formData)
      setFormData({
        customer_id: '',
        car_id: '',
        rental_date: '',
      })
      alert('Rental created successfully!')
      fetchAvailableCars() // Refresh available cars list
      window.location.reload()
    } catch (error) {
      console.error('Error creating rental:', error)
      alert('Error creating rental. Please try again.')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customer_id">Customer:</label>
          <select
            id="customer_id"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a customer</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="car_id">Car:</label>
          <select
            id="car_id"
            name="car_id"
            value={formData.car_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a car</option>
            {cars.map(car => (
              <option key={car.id} value={car.id}>
                {car.brand} {car.model} ({car.year})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="rental_date">Rental Date:</label>
          <input
            type="date"
            id="rental_date"
            name="rental_date"
            value={formData.rental_date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Rental</button>
      </form>
    </>
  )
}

export default RentalForm
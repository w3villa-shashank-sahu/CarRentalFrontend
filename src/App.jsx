import React from 'react'
import CarList from './components/CarList'
import CustomerForm from './components/CustomerForm'
import RentalForm from './components/RentalForm'
import ActiveRentals from './components/ActiveRentals'
import RentalHistory from './components/rentalHistory'
import './App.css'

function App() {
  return (
    <div className="app">
      <header>
        <h1>Car Rental System</h1>
      </header>
      
      <div className="dashboard">
        <section className="forms-section">
          <div className="card">
            <div className="card-header">
              <h2>Add New Customer</h2>
            </div>
            <CustomerForm />
          </div>
          
          <div className="card">
            <div className="card-header">
              <h2>Create New Rental</h2>
            </div>
            <RentalForm />
          </div>
        </section>

        <section className="data-section">
          <div className="card">
            <div className="card-header">
              <h2>Available Cars</h2>
            </div>
            <CarList />
          </div>
          <ActiveRentals />
        </section>
      </div>

      <RentalHistory />
    </div>
  )
}

export default App

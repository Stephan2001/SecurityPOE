import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../payments.css'

const csrfToken = localStorage.getItem('csrfToken')

const PaymentsPage = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredPayments, setFilteredPayments] = useState([])

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('/api/payment')
        setPayments(response.data)
        setFilteredPayments(response.data) // Display all payments initially
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch payments. Please try again later.')
        setLoading(false)
      }
    }

    fetchPayments()
  }, [])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchClick = () => {
    const filteredData = payments.filter((payment) =>
      payment.AccountNumber.includes(searchQuery)
    )
    setFilteredPayments(filteredData)
  }

  const handleConfirmPayment = async (id) => {
    try {
      const response = await axios.put(
        `/api/payment/${id}/confirm`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
        }
      )
      console.log('Payment updated:', response.data)
      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment._id === id ? { ...payment, confirmed: true } : payment
        )
      )
      setFilteredPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment._id === id ? { ...payment, confirmed: true } : payment
        )
      )
    } catch (err) {
      console.error('Error updating payment:', err)
      setError('Failed to update payment confirmation. Please try again later.')
    }
  }

  if (loading) {
    return <p>Loading payments...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="payments-container">
      <h2>Payments</h2>

      {/* Search Bar and Button */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Enter Account Number"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
        <button onClick={handleSearchClick} className="search-button">
          Search
        </button>
      </div>

      {filteredPayments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table className="payments-table">
          <thead>
            <tr>
              <th>Account Number</th>
              <th>Currency</th>
              <th>Amount</th>
              <th>Provider</th>
              <th>SWIFT Code</th>
              <th>Confirmed</th>
              <th>Date</th>
              <th>Validate</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.AccountNumber}</td>
                <td>{payment.currency}</td>
                <td>{payment.amount}</td>
                <td>{payment.provider}</td>
                <td>{payment.swiftCode}</td>
                <td>{payment.confirmed ? 'Yes' : 'No'}</td>
                <td>{new Date(payment.createdAt).toLocaleString()}</td>
                <td>
                  {!payment.confirmed && (
                    <button
                      className="small-button"
                      onClick={() => handleConfirmPayment(payment._id)}
                    >
                      Confirm Payment
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default PaymentsPage

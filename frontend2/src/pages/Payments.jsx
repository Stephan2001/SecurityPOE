import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PaymentsPage = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Fetch payments from the backend API
    const fetchPayments = async () => {
      try {
        const response = await axios.get('/api/payment') // Endpoint for fetching all payments
        setPayments(response.data) // Set fetched payments to state
        setLoading(false) // Set loading to false when data is fetched
      } catch (err) {
        setError('Failed to fetch payments. Please try again later.')
        setLoading(false)
      }
    }

    fetchPayments() // Call the fetchPayments function on component mount
  }, []) // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <p>Loading payments...</p> // Display a loading message while fetching data
  }

  if (error) {
    return <p>{error}</p> // Display an error message if something goes wrong
  }

  return (
    <div className="payments-container">
      <h2>Payments</h2>
      {payments.length === 0 ? (
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
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.AccountNumber}</td>
                <td>{payment.currency}</td>
                <td>{payment.amount}</td>
                <td>{payment.provider}</td>
                <td>{payment.swiftCode}</td>
                <td>{payment.confirmed ? 'Yes' : 'No'}</td>
                <td>{new Date(payment.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default PaymentsPage

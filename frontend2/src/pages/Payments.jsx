import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PaymentsPage = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('/api/payment')
        setPayments(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch payments. Please try again later.')
        setLoading(false)
      }
    }

    fetchPayments()
  }, [])

  if (loading) {
    return <p>Loading payments...</p>
  }

  if (error) {
    return <p>{error}</p>
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

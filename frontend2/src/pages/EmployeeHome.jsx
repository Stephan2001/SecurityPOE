import React, { useState, useEffect } from 'react'
import '../Home.css'

export const EmployeeHome = () => {
  const [paymentData, setPaymentData] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <div className="payment-data-container">
      <h2 className="heading2">Employee Payment Data</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <table className="payment-data-table">
        <thead>
          <tr>
            <th>Payment ID</th> <th>Account Number</th> <th>Currency</th>
            <th>Amount</th> <th>Provider</th> <th>SWIFT Code</th>
          </tr>
        </thead>
        <tbody>
          {paymentData.map((payment) => (
            <tr key={payment._id}>
              <td>{payment._id}</td> <td>{payment.AccountNumber}</td>
              <td>{payment.currency}</td> <td>{payment.amount}</td>
              <td>{payment.provider}</td> <td>{payment.swiftCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default EmployeeHome

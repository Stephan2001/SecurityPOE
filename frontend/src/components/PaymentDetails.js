import React from 'react';

const PaymentDetails = ({ payment, onDelete }) => {
    const handleDelete = () => {
        // Call the delete function passed from the parent component
        if (onDelete) {
            onDelete(payment._id);
        }
    };

    return (
        <div className="payment-details">
            <h4>{payment.amount}</h4>
            <p><strong>Currency: </strong>{payment.currency}</p>
            <p><strong>Provider: </strong>{payment.provider}</p>
            <p><strong>Account Number: </strong>{payment.AccountNumber}</p>
            <p><strong>Created At: </strong>{new Date(payment.createdAt).toLocaleString()}</p>
            <span onClick={handleDelete} style={{ cursor: 'pointer', color: 'red' }}>Delete Payment</span>
        </div>
    );
}

export default PaymentDetails;

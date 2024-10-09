import React, { useState } from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('ZAR');
    const [provider, setProvider] = useState('SWIFT');
    const [accountInfo, setAccountInfo] = useState('');
    const [swiftCode, setSwiftCode] = useState(''); // Add swiftCode state
    const [errorMessage, setErrorMessage] = useState(''); // For displaying errors
    const [successMessage, setSuccessMessage] = useState(''); // For displaying success message
    const csrfToken = localStorage.getItem('csrfToken');
    //console.log('Using CSRF Token:', csrfToken);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear previous error message
        setSuccessMessage(''); // Clear previous success message

        // Payment data to be sent to the API
        const paymentData = {
            AccountNumber: accountInfo,
            currency,
            amount: parseFloat(amount), // Convert amount to a number
            provider,
            swiftCode // Include swiftCode in the payment data
        };

        try {
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify(paymentData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong');
            }

            const result = await response.json();
            setSuccessMessage(`Payment successful! Payment ID: ${result._id}`);
        } catch (error) {
            setErrorMessage(error.message);
            console.error('Payment error:', error);
        }
    };

    return (
        <div className="auth-form-container">
            <form className="payments-form" onSubmit={handleSubmit}>
                <h2 className="heading">Payment Form</h2>

                {/* Amount */}
                <label htmlFor="amount">Amount:</label>
                <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required 
                />

                {/* Currency */}
                <label htmlFor="currency">Currency:</label>
                <select 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)} 
                >
                    <option value="ZAR">ZAR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="CAD">CAD</option>
                    <option value="AUD">AUD</option>
                    <option value="GBP">GBP</option>
                </select>
     
                {/* Payment Provider */}
                <label htmlFor="provider">Payment Provider:</label>
                <select 
                    value={provider} 
                    onChange={(e) => setProvider(e.target.value)} 
                >
                    <option value="SWIFT">FNB</option>
                </select>
        
                {/* Account Info */}
                <label htmlFor="accountInfo">Account Information:</label>
                <input 
                    type="text" 
                    value={accountInfo} 
                    onChange={(e) => setAccountInfo(e.target.value)} 
                    required 
                />

                {/* SWIFT Code */}
                <label htmlFor="swiftCode">SWIFT Code:</label>
                <input 
                    type="text" 
                    value={swiftCode} 
                    onChange={(e) => setSwiftCode(e.target.value)} 
                    required 
                />
        
                {/* Pay now */}
                <button type="submit">Pay Now</button>

                {/* Error and success messages */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
        </div>
    );
};

export default Home;

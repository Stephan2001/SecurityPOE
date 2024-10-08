import { useState } from 'react';

const PaymentForm = () => {
    // State variables for form inputs and errors
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('ZAR'); // Default to ZAR, convert to valid backend currencies if needed
    const [provider, setProvider] = useState('SWIFT'); // Default provider
    const [accountInfo, setAccountInfo] = useState(''); // AccountNumber field
    const [error, setError] = useState(null);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Map the front-end fields to match the backend API
        const payment = {
            AccountNumber: accountInfo, // Backend expects AccountNumber
            currency,                   // currency field
            amount,                     // amount field
            provider                    // provider field
        };

        // API call to the backend
        const response = await fetch('/api/payment', {
            method: 'POST',
            body: JSON.stringify(payment), // Send payment data as JSON
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json(); // Parse the JSON response

        if (!response.ok) {
            setError(json.error); // Show validation or server errors
        } else {
            // Clear form fields on successful payment submission
            setAmount('');
            setCurrency('ZAR'); // Reset to default currency
            setProvider('SWIFT'); // Reset to default provider
            setAccountInfo('');
            setError(null); // Clear any existing errors
            console.log("New payment added", json);
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add new payment</h3>

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
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} required>
                <option value="ZAR">ZAR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="AUD">AUD</option>
                <option value="CAD">CAD</option>
            </select>

            {/* Payment Provider */}
            <label htmlFor="provider">Payment Provider:</label>
            <select value={provider} onChange={(e) => setProvider(e.target.value)} required>
                <option value="SWIFT">SWIFT</option>
                {/* Add more providers if needed */}
            </select>

            {/* Account Info */}
            <label htmlFor="accountInfo">Account Number:</label>
            <input 
                type="text" 
                value={accountInfo} 
                onChange={(e) => setAccountInfo(e.target.value)} 
                required 
                placeholder="Enter 10-digit account number"
            />

            {/* Submit button */}
            <button type="submit">Pay Now</button>

            {/* Display error messages */}
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default PaymentForm;

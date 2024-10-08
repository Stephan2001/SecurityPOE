import React, { useState } from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('ZAR');
    const [provider, setProvider] = useState('SWIFT');
    const [accountInfo, setAccountInfo] = useState('');
    const [swiftCode, setSwiftCode] = useState('');
    
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            amount,
            currency,
            provider,
            accountInfo,
            swiftCode,
        });
        // You can add your payment processing logic here

        // Optionally, navigate to a success page or another route after submission
        // navigate('/success'); // Uncomment and change '/success' to your success route if needed
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
                    {/* Add more currencies as needed */}
                </select>
     
                {/* Payment Provider */}
                <label htmlFor="provider">Payment Provider:</label>
                <select 
                    value={provider} 
                    onChange={(e) => setProvider(e.target.value)} 
                >
                    <option value="SWIFT">SWIFT</option>
                    {/* Add other providers as needed */}
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
            </form>
        </div>
    );
};

export default Home;

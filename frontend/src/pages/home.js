import React, { useState } from "react"

export const Home = (props) => {
    const [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('ZAR')
    const [provider, setProvider] = useState('SWIFT')
    const [accountInfo, setAccountInfo] = useState('')
    const [swiftCode, setSwiftCode] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            amount,
            currency,
            provider,
            accountInfo,
            swiftCode,
        })
    }

    return (
        <div className="auth-from-container">
            <form className="payments-form" onSubmit={handleSubmit}>
                <h2>Payment Form</h2>

                {/* Amount */}
                <label htmlFor="amount">Amount:</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
    
                {/* Currency */}
                <label htmlFor="currency">Currency:</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} >
                    <option value="ZAR">ZAR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                {/* Add more currencies as needed */}
                </select>
     
                {/* Payment Provider */}
                <label htmlFor="swiftCode">Payment Provider:</label>
                <select value={provider} onChange={(e) => setProvider(e.target.value)} >
                    <option value="SWIFT">SWIFT</option>
                    {/* Add other providers as needed */}
                </select>
        
                {/* Account Info */}
                <label htmlFor="accountInfo">Account Information:</label>
                <input type="text" value={accountInfo} onChange={(e) => setAccountInfo(e.target.value)} required />
        
                {/* SWIFT Code */}
                <label htmlFor="">SWIFT Code:</label>
                <input type="text" value={swiftCode} onChange={(e) => setSwiftCode(e.target.value)} required />
        
                {/* Pay now */}
                <button type="submit">Pay Now</button>
            </form>
        </div>
    )
}

export default Home
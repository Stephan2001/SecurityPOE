import{useState} from 'react'
const PaymentForm = () => {
    const [amount, setAmount] = useState('')
    const [currency, setCurrency] = useState('ZAR')
    const [provider, setProvider] = useState('SWIFT')
    const [accountInfo, setAccountInfo] = useState('')
    const [swiftCode, setSwiftCode] = useState('')
    const[error, setError] = useState(null)


    const handleSubmit = async(e) =>{
        e.preventDefault() // deafualt actions is to refesh the page on submit, we do not want this

        const payment = {amount, currency, provider, accountInfo, swiftCode}

        const response = await fetch('api/payment', {
            method:'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setAmount('')
            setCurrency('')
            setProvider('')
            setAccountInfo('')
            setSwiftCode('')
            setError(null)
            console.log("New payment added", json)
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>

            <h3>Add new payment</h3>
            <label>Amount:</label>
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
            {error && <div className='error'>{error}</div>}
        </form>
    )

}

export default PaymentForm
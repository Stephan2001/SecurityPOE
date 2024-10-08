import React, { useState } from "react"

export const Register = (props) => {
    const [fullname, setFullname] = useState('')
    const [ID, setID] = useState('')
    const [accountNo, setAccountNo] = useState('')
    const [pass, setPass] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(fullname)
    }
    

    return (
        <div className="auth-from-container">
            <h2 className="heading">Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                {/* Full name */}
                <label htmlFor="fullname">Fullname:</label>
                <input value={fullname} onChange={(e) => setFullname(e.target.value)} name="fullname" id="fullname" />
                {/* ID Number */}
                <label htmlFor="ID">ID Number:</label>
                <input value={ID} onChange={(e) => setID(e.target.value)} name="ID" id="ID" />
                {/* Account Number */}
                <label htmlFor="accountNo">Account Number:</label>
                <input value={accountNo} onChange={(e) => setAccountNo(e.target.value)} name="accountNo" id="accountNo" />
                {/* Password */}
                <label htmlFor="password">Password:</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" id="password" name="password" />
                {/* Register button */}
                <button type="submit">Register</button>
            </form>
            {/* Button to register page */}
            <button className="btn" onClick={() => props.onFormSwitch('login')}><i>Already have an account? Login here.</i></button>
        </div>
    )
}


export default Register
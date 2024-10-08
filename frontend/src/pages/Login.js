import React, { useState } from "react"

export const Login = (props) => {
    const [fullname, setFullname] = useState('')
    const [ID, setID] = useState('')
    const [accountNo, setAccountNo] = useState('')
    const [pass, setPass] = useState('')
    const{login, isLoading, error} = userLogin()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(fullname)
    }
    
    return (
        <div className="auth-from-container">
        <h2 className="heading">Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
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
                
                {/* Login button */}
                <button type="submit">LOGIN</button>
            </form>
                
                {/* Button to register page */}
                <button className="btn" onClick={() => props.onFormSwitch('register')}><i>Don't have an account? Register here.</i></button>
        </div>
    )    
}

export default Login
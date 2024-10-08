import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [fullname, setFullname] = useState('');
    const [ID, setID] = useState('');
    const [accountNo, setAccountNo] = useState('');
    const [pass, setPass] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate(); // Hook for programmatic navigation

    useEffect(() => {
        // Fetch the CSRF token
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('/api/csrf-token'); // Use relative path
                setCsrfToken(response.data.csurfToken);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch CSRF token');
            }
        };

        fetchCsrfToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!csrfToken) {
            setError('CSRF token is not available. Please refresh the page and try again.');
            return;
        }

        // Log each input field value
        console.log('Full Name:', fullname);
        console.log('ID Number:', ID);
        console.log('Account Number:', accountNo);
        console.log('Password:', pass); 

        try {
            const response = await axios.post('/api/user/login', {
                fullName: fullname,
                password: pass,
                IDNumber: ID,
                AccountNumber: accountNo, // Optional: include AccountNumber if needed
            }, {
                headers: {
                    'X-CSRF-Token': csrfToken,
                },
            });

            console.log(response.data);
            // Handle successful login (e.g., navigate to home)
            navigate('/'); // Redirect to home after successful login
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="auth-form-container">
            <h2 className="heading">Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                {/* Full name */}
                <label htmlFor="fullname">Fullname:</label>
                <input 
                    value={fullname} 
                    onChange={(e) => setFullname(e.target.value)} 
                    name="fullname" 
                    id="fullname" 
                    required
                />
                
                {/* ID Number */}
                <label htmlFor="ID">ID Number:</label>
                <input 
                    value={ID} 
                    onChange={(e) => setID(e.target.value)} 
                    name="ID" 
                    id="ID" 
                    required
                />
                
                {/* Account Number */}
                <label htmlFor="accountNo">Account Number:</label>
                <input 
                    value={accountNo} 
                    onChange={(e) => setAccountNo(e.target.value)} 
                    name="accountNo" 
                    id="accountNo" 
                    required
                />
                
                {/* Password */}
                <label htmlFor="password">Password:</label> 
                <input 
                    value={pass}  
                    onChange={(e) => setPass(e.target.value)} 
                    type="password" 
                    id="password" 
                    name="password" 
                    required
                />
                
                {/* Login button */}
                <button type="submit">LOGIN</button>
                {error && <p className="error">{error}</p>}
            </form>
                
            {/* Button to register page */}
            <button className="btn" onClick={() => navigate('/register')}>
                <i>Don't have an account? Register here.</i>
            </button>
        </div>
    );    
};

export default Login;

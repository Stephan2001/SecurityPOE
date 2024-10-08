import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [fullname, setFullname] = useState('');
    const [pass, setPass] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate(); // Hook for programmatic navigation

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('/api/csrf-token'); 
                setCsrfToken(response.data.csurfToken);
                localStorage.setItem('csrfToken', response.data.csurfToken);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch CSRF token');
            }
        };

        fetchCsrfToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Retrieve token from state or local storage
        const token = csrfToken || localStorage.getItem('csrfToken');

        if (!token) {
            setError('CSRF token is not available. Please refresh the page and try again.');
            return;
        }

        //console.log('Using CSRF Token:', token); // Log the token being used for the request
        //console.log('Full Name:', fullname);
        //console.log('Password:', pass); 

        try {
            const response = await axios.post('/api/user/login', {
                fullName: fullname,
                password: pass,
            }, {
                headers: {
                    'X-CSRF-Token': token,
                },
            });

            //console.log('Login Response:', response.data);
            navigate('/home'); // Redirect to home after successful login
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="auth-form-container">
            <h2 className="heading">Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="fullname">Fullname:</label>
                <input 
                    value={fullname} 
                    onChange={(e) => setFullname(e.target.value)} 
                    name="fullname" 
                    id="fullname" 
                    required
                />
                
                <label htmlFor="password">Password:</label> 
                <input 
                    value={pass}  
                    onChange={(e) => setPass(e.target.value)} 
                    type="password" 
                    id="password" 
                    name="password" 
                    required
                />
                
                <button type="submit">LOGIN</button>
                {error && <p className="error">{error}</p>}
            </form>
                
            <button className="btn" onClick={() => navigate('/register')}>
                <i>Don't have an account? Register here.</i>
            </button>
        </div>
    );    
};

export default Login;

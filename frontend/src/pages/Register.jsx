import React, { useState, useEffect } from "react";
import '../App.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const Register = () => {
    const [fullname, setFullname] = useState('');
    const [ID, setID] = useState('');
    const [accountNo, setAccountNo] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState(null);
    const [csrfToken, setCsrfToken] = useState(null); // State for CSRF token

    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('/api/csrf');
                console.log(response.data); // Log the entire response to debug
                setCsrfToken(response.data.csrfToken); // Adjust if the structure is different
            } catch (err) {
                console.error('Error fetching CSRF token:', err);
                setError('Could not fetch CSRF token');
            }
        };

        fetchCsrfToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!csrfToken) {
            setError('CSRF token is not available'); // Handle case where token is not fetched
            return;
        }

        try {
            const response = await axios.post('/api/user/signup', {
                IDNumber: ID,
                fullName: fullname,
                password: pass,
            }, {
                headers: {
                    'X-CSRF-Token': csrfToken, // Include CSRF token in the header
                },
            });

            console.log(response.data);
            navigate('/login'); 
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="auth-form-container">
            <h2 className="heading">Register</h2>
            {error && <p className="error-message">{error}</p>}
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="fullname">Fullname:</label>
                <input 
                    value={fullname} 
                    onChange={(e) => setFullname(e.target.value)} 
                    name="fullname" 
                    id="fullname" 
                />
                
                <label htmlFor="ID">ID Number:</label>
                <input 
                    value={ID} 
                    onChange={(e) => setID(e.target.value)} 
                    name="ID" 
                    id="ID" 
                />
                
                <label htmlFor="accountNo">Account Number:</label>
                <input 
                    value={accountNo} 
                    onChange={(e) => setAccountNo(e.target.value)} 
                    name="accountNo" 
                    id="accountNo" 
                />
                
                <label htmlFor="password">Password:</label>
                <input 
                    value={pass}  
                    onChange={(e) => setPass(e.target.value)} 
                    type="password" 
                    id="password" 
                    name="password" 
                />
                
                <button type="submit">Register</button>
            </form>
            
            <button className="btn" onClick={() => navigate('/login')}>
                <i>Already have an account? Login here.</i>
            </button>
        </div>
    );
};

export default Register;

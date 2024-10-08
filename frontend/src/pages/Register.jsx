import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
    const [ID, setID] = useState('');
    const [accountNumber, setAccountNumber] = useState(''); // State for AccountNumber
    const [fullname, setFullname] = useState('');
    const [pass, setPass] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const [error, setError] = useState('');

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
        //console.log('ID Number:', ID);
        //console.log('Account Number:', accountNumber);
        //console.log('Full Name:', fullname);
        //console.log('Password:', pass); 

        try {
            const response = await axios.post('/api/user/signup', {
                IDNumber: ID,
                AccountNumber: accountNumber, // Include AccountNumber in the request
                fullName: fullname,
                password: pass,
            }, {
                headers: {
                    'X-CSRF-Token': csrfToken,
                },
            });

            //console.log(response.data);
        } catch (err) {
            //console.error(err);
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
    type="text"
    value={ID}
    onChange={(e) => {
        //console.log('ID Number Input:', e.target.value); // Log the ID input value
        setID(e.target.value);
    }}
    placeholder="ID Number"
    required
/>
<input
    type="text"
    value={accountNumber}
    onChange={(e) => {
        //console.log('Account Number Input:', e.target.value); // Log the Account Number input value
        setAccountNumber(e.target.value);
    }} 
    placeholder="Account Number"
    required
/>
<input
    type="text"
    value={fullname}
    onChange={(e) => {
        //console.log('Full Name Input:', e.target.value); // Log the Full Name input value
        setFullname(e.target.value);
    }}
    placeholder="Full Name"
    required
/>
<input
    type="password"
    value={pass}
    onChange={(e) => {
        //console.log('Password Input:', e.target.value); // Log the Password input value
        setPass(e.target.value);
    }}
    placeholder="Password"
    required
/>
            <button type="submit">Register</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default RegisterPage;

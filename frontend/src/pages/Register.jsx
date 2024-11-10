import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // Import useNavigate

const RegisterPage = () => {
  const [ID, setID] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [fullname, setFullname] = useState('')
  const [pass, setPass] = useState('')
  const [csrfToken, setCsrfToken] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate() // Initialize the navigate function

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/api/csrf-token')
        setCsrfToken(response.data.csurfToken)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch CSRF token')
      }
    }

    fetchCsrfToken()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!csrfToken) {
      setError(
        'CSRF token is not available. Please refresh the page and try again.'
      )
      return
    }

    try {
      const response = await axios.post(
        '/api/user/signup',
        {
          IDNumber: ID,
          AccountNumber: accountNumber,
          fullName: fullname,
          password: pass,
        },
        {
          headers: {
            'X-CSRF-Token': csrfToken,
          },
        }
      )

      if (response.status === 200) {
        // Navigate to the default page on successful registration
        navigate('/') // Replace '/default' with your default page route
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <div>
      <h2 className="heading2">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ID}
          onChange={(e) => setID(e.target.value)}
          placeholder="ID Number"
          required
        />
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Account Number"
          required
        />
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Full Name"
          required
        />
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default RegisterPage

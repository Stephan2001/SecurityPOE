import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import '../register.css'
import Button from 'react-bootstrap/Button'

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
      const errorMessage =
        typeof err.response?.data?.error === 'string'
          ? err.response.data.error
          : 'Registration failed. Please try again.'
      setError(errorMessage)
    }
  }

  return (
    <div>
      <h2 className="heading2">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="idNumber">ID Number:</label>
          <input
            type="text"
            value={ID}
            onChange={(e) => setID(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="accNumber">Account Number:</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="fullname">Full name:</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
        <Button variant="dark" className="register-button" type="submit">
          Register
        </Button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default RegisterPage

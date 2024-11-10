import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'

export const EmployeeLogin = () => {
  const [fullname, setFullname] = useState('')
  const [pass, setPass] = useState('')
  const [csrfToken, setCsrfToken] = useState('')
  const [error, setError] = useState('')
  const [recaptchaValue, setRecaptchaValue] = useState('') // Added state for reCAPTCHA value

  const navigate = useNavigate() // Hook for programmatic navigation

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('/api/csrf-token')
        setCsrfToken(response.data.csurfToken)
        localStorage.setItem('csrfToken', response.data.csurfToken)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch CSRF token')
      }
    }

    fetchCsrfToken()
  }, [])

  const handleRecaptcha = (value) => {
    setRecaptchaValue(value) // Added function to handle reCAPTCHA value
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Retrieve token from state or local storage
    const token = csrfToken || localStorage.getItem('csrfToken')

    if (!token) {
      setError(
        'CSRF token is not available. Please refresh the page and try again.'
      )
      return
    }

    // Check if reCAPTCHA is completed
    if (!recaptchaValue) {
      setError('Please complete the reCAPTCHA.')
      return
    }

    try {
      const response = await axios.post(
        '/api/employees/login',
        {
          fullName: fullname,
          password: pass,
        },
        {
          headers: {
            'X-CSRF-Token': token,
            reCaptcha: recaptchaValue, // Send reCAPTCHA value with the request
          },
        }
      )

      navigate('/Payments') // Redirect to home after successful login
    } catch (err) {
      console.error(err)
      const errorMessage =
        typeof err.response?.data?.error === 'string'
          ? err.response.data.error
          : 'Login failed'
      setError(errorMessage)
    }
  }

  return (
    <div className="auth-form-container">
      <h2 className="heading">Login</h2>
      <div className="form-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="fullname">Fullname:</label>
            <input
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              name="fullname"
              id="fullname"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
          <div className="recaptcha-container">
            <ReCAPTCHA
              sitekey="6LfepHoqAAAAAM_uSRcnuCOcoAAcLCg7nlwKG9Np"
              onChange={handleRecaptcha} // Ensure this uses handleRecaptcha function
            />
          </div>
          <button className="login-button" type="submit">
            LOGIN
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default EmployeeLogin

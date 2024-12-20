import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../login.css'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import ReCAPTCHA from 'react-google-recaptcha'
import Loading from './MainLoadingScreen' // Import the Loading component

export const Login = () => {
  const [fullname, setFullname] = useState('')
  const [pass, setPass] = useState('')
  const [csrfToken, setCsrfToken] = useState('')
  const [error, setError] = useState('')
  const [recaptchaValue, setRecaptchaValue] = useState('') // Added state for reCAPTCHA value
  const [isLoading, setIsLoading] = useState(false) // Added loading state

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
      setIsLoading(true) // Set loading state to true

      const response = await axios.post(
        '/api/user/login',
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

      setTimeout(() => {
        navigate('/home') // Redirect to home after successful login
      }, 2000)
    } catch (err) {
      console.error(err)
      const errorMessage =
        typeof err.response?.data?.error === 'string'
          ? err.response.data.error
          : 'Login failed'
      setError(errorMessage)
      setIsLoading(false) // Reset loading state on error
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div className="auth-form-container">
      <h2 className="heading2">Login</h2>
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
          <Button variant="dark" className="login-button" type="submit">
            LOGIN
          </Button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
      <div className="register-link">
        <Button className="btn" onClick={() => navigate('/register')}>
          <i>Don't have an account? Register here.</i>
        </Button>
      </div>
    </div>
  )
}

export default Login

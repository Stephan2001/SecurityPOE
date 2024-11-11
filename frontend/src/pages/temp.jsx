import React, { useState, useEffect } from 'react'
import '../temp.css'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Loading from './LoadingScreen' // Import the Loading component

const Temp = () => {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Adjust the delay as needed

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = () => {
    navigate('/login')
  }

  const handleRegister = () => {
    navigate('/register')
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <h1 className="heading">Welcome to Prime Vault</h1>
      <div className="button-container">
        <Button variant="dark" onClick={handleLogin} className="button">
          Login
        </Button>
        <Button variant="dark" onClick={handleRegister} className="button">
          Register
        </Button>
      </div>
    </div>
  )
}

export default Temp

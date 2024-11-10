import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Temp = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login')
  }

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <div>
      <h1 className="heading">Welcome to the Bank</h1>
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

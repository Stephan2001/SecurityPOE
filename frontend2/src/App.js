import './App.css'
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import EmployeeLogin from './pages/EmployeeLogin'
import Payments from './pages/Payments'

function App() {
  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (formName) => {
    setCurrentForm(formName)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Default route to redirect to login */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={<EmployeeLogin onFormSwitch={toggleForm} />}
          />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

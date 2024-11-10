import './App.css'
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

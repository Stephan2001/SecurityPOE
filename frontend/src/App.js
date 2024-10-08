import React, { useState } from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Login from './pages/Login';
import Register from './pages/Register';
import Temp from './pages/temp';


function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Temp />} /> 
        <Route path="/login" element={<Login onFormSwitch={toggleForm} />} />
        <Route path="/register" element={<Register onFormSwitch={toggleForm} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

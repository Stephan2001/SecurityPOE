const Emp = require('../models/Employee.js')
const jwt = require('jsonwebtoken')

// JWT token creation function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '3d' })
}

// Employee login function
const loginEmployee = async (req, res) => {
  const { fullName, password } = req.body

  try {
    const employee = await Emp.login(fullName, password)
    const token = createToken(employee._id) // Create JWT token

    // Set the cookie with the JWT token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3 * 24 * 60 * 60 * 1000, // Token expiration: 3 days
      sameSite: 'Strict', // To prevent CSRF attacks
    })

    // Send the response with employee data and token
    res.status(200).json({ fullName, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Employee register function
const registerEmployee = async (req, res) => {
  const { AccountNumber, fullName, password } = req.body

  // Log the incoming data for debugging
  console.log('Received data for registration:', req.body)

  try {
    // Check if AccountNumber already exists
    const existingEmployee = await Emp.findOne({ AccountNumber })
    if (existingEmployee) {
      console.log('Account number already exists:', AccountNumber)
      return res.status(400).json({ error: 'Account number already exists' })
    }

    // Create a new employee document
    const employee = new Emp({ AccountNumber, fullName, password })

    console.log('Attempting to save employee:', employee)

    // Save the employee to the database
    await employee.save()
    console.log('Employee saved successfully:', employee)

    // Create the JWT token
    const token = createToken(employee._id)
    console.log('JWT token created:', token)

    // Set the cookie with the JWT token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure cookie if in production
      maxAge: 3 * 24 * 60 * 60 * 1000, // Token expiration: 3 days
      sameSite: 'Strict', // To prevent CSRF attacks
    })

    // Send the response with success message
    res.status(201).json({ message: 'Employee registered successfully', token })
  } catch (error) {
    console.error('Error during employee registration:', error)
    res.status(400).json({ error: error.message })
  }
}

// Employee logout function
const logoutEmployee = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0), // Expire the cookie immediately
  })
  res.status(200).json({ message: 'Logged out successfully' })
}

module.exports = {
  loginEmployee,
  registerEmployee,
  logoutEmployee,
}

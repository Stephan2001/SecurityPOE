const express = require('express')
const {
  loginEmployee,
  registerEmployee,
  logoutEmployee,
} = require('../Controllers/EmployeeController')
const ExpressBrute = require('express-brute')
const store = new ExpressBrute.MemoryStore()

// Brute force protection for employee login
const bruteforce = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 1000 * 60,
  maxWait: 1000 * 60 * 10,
  lifetime: 1000 * 60 * 10,
})

const router = express.Router()

router.post('/login', bruteforce.prevent, loginEmployee)
//router.post('/register', registerEmployee) // This was ONLY used to register the intitial static employee users and are thus commented out
router.post('/logout', logoutEmployee)

module.exports = router

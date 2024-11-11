const request = require('supertest')
const app = require('../server')
const mongoose = require('mongoose')

let csrfToken
let cookie

jest.setTimeout(30000) // Set a longer timeout for asynchronous operations

// Before all tests: Set up MongoDB connection and fetch CSRF token
beforeAll(async () => {
  // Connect to MongoDB
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // Fetch the CSRF token
  const response = await request(app).get('/api/csrf-token')

  if (response.status !== 200) {
    throw new Error('Failed to fetch CSRF token')
  }

  csrfToken = response.body.csurfToken
  cookie = response.headers['set-cookie']

  if (!csrfToken || !cookie) {
    throw new Error('CSRF token or cookie is missing')
  }

  // Log for debugging
  console.log('CSRF Token:', csrfToken)
  console.log('Set-Cookie:', cookie)
})

// After all tests: Clean up the database and close MongoDB connection
afterAll(async () => {
  await mongoose.connection.close()

  if (app.close) {
    app.close()
  }
})

// Tests
describe('Login and Confirm Payment Flow', () => {
  it('should login successfully, fetch payments and confirm a payment', async () => {
    const loginData = {
      fullName: 'Employee Sarah',
      password: 'securePassword123',
    }

    // Step 1: Log in with employee credentials
    const loginResponse = await request(app)
      .post('/api/employees/login')
      .set('Cookie', cookie) // Set the CSRF token cookie
      .set('csrf-token', csrfToken) // Set CSRF token header correctly
      .send(loginData)

    // Log the login response to help debug
    console.log('Login Response:', loginResponse.body)
    console.log('Login Response Status:', loginResponse.status)
    console.log('Set-Cookie:', loginResponse.headers['set-cookie'])

    // Ensure login is successful
    expect(loginResponse.status).toBe(200) // Check for 200 status
    expect(loginResponse.body).toHaveProperty('fullName', 'Employee Sarah')
    expect(loginResponse.body).toHaveProperty('token')

    // Step 2: Fetch payments list
    const paymentsResponse = await request(app)
      .get('/api/payment') // Get payments list
      .set('Cookie', cookie)
      .set('csrf-token', csrfToken)

    // Log the payments response for debugging
    console.log('Payments Response:', paymentsResponse.body)

    expect(paymentsResponse.status).toBe(200)
    expect(Array.isArray(paymentsResponse.body)).toBe(true)

    // Step 3: Confirm a payment
    if (paymentsResponse.body.length > 0) {
      const paymentId = paymentsResponse.body[0]._id // Assuming the first payment is to be confirmed

      const confirmPaymentResponse = await request(app)
        .put(`/api/payment/${paymentId}/confirm`) // Confirm payment by ID
        .set('Cookie', cookie)
        .set('csrf-token', csrfToken) // Pass CSRF token
        .send({}) // Send an empty body, as required by the API

      // Log the payment confirmation response for debugging
      console.log('Confirm Payment Response:', confirmPaymentResponse.body)

      // Ensure the payment is confirmed
      expect(confirmPaymentResponse.status).toBe(200)
      expect(confirmPaymentResponse.body).toHaveProperty('confirmed', true)

      // Additional checks to confirm the state of the payment
      const updatedPaymentsResponse = await request(app)
        .get('/api/payment')
        .set('Cookie', cookie)
        .set('csrf-token', csrfToken)

      const updatedPayment = updatedPaymentsResponse.body.find(
        (payment) => payment._id === paymentId
      )

      expect(updatedPayment.confirmed).toBe(true)
    } else {
      console.log('No payments to confirm.')
    }
  })
})

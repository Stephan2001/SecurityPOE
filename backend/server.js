const express = require('express')
const userRoute = require('./routes/userRouter')
const paymentRoute = require('./routes/payments')
const mongoose = require('mongoose')
const https = require('https')
const path = require('path')
const fs = require('fs')
const csurf = require('csurf')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
require('dotenv').config()
const http = require('http')
const httpPort = process.env.HTTP_PORT || 3001
const hsts = require('hsts')
const employeeRoutes = require('./routes/empRouter')

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      frameAncestors: ["'self'"], // Only allow framing by the same origin
    },
  })
)
app.use(
  csurf({
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
  })
)

app.use(
  hsts({
    maxAge: 63072000,
    includeSubDomains: true,
    preload: true,
  })
)

app.use((req, res, next) => {
  res.locals.csurfToken = req.csrfToken()
  console.log(req.path, req.method)
  next()
})

// Register routes
app.use('/api/employees', employeeRoutes)
app.use('/api/payment', paymentRoute)
app.use('/api/user', userRoute)

// CSRF token endpoint
app.get('/api/csrf-token', (req, res) => {
  res.json({ csurfToken: req.csrfToken() })
})

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected successfully to MongoDB')
  })
  .catch((error) => {
    console.log(error)
  })

// Determine if we should start an SSL server
const isTest = process.env.NODE_ENV === 'test'

if (isTest) {
  // In test mode, run an HTTP server
  const httpServer = app.listen(0, () => {
    console.log(`HTTP server listening on port 3000`)
  })

  module.exports = httpServer // Export the server for testing
} else {
  // HTTPS setup
  const sslServer = https.createServer(
    {
      key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    },
    app
  )

  const PORT = process.env.PORT || 3000
  sslServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })

  // Create HTTP server to redirect to HTTPS
  const allowedHosts = ['example.com', 'www.example.com'] // Replace with your allowed hosts

  const httpServer = http.createServer((req, res) => {
    // Validate Host header
    const host = req.headers.host

    if (!allowedHosts.includes(host)) {
      console.error(`Unauthorized host: ${host}`)
      res.writeHead(400, { 'Content-Type': 'text/plain' })
      return res.end('Bad Request')
    }

    // Sanitize the URL to prevent malicious input
    const sanitizedUrl = new URL(req.url, `https://${host}`).href // Use URL constructor to sanitize

    res.writeHead(301, { Location: sanitizedUrl })
    res.end()
  })

  httpServer.listen(httpPort, () => {
    console.log(
      `HTTP server listening on port ${httpPort} and redirecting to HTTPS`
    )
  })

  module.exports = sslServer // Export the SSL server
}

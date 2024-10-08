const express = require('express');
const userRoute = require('./routes/userRouter');
const paymentRoute = require('./routes/payments');
const mongoose = require('mongoose');
const https = require('https');
const path = require('path');
const fs = require('fs');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
require('dotenv').config();
const http = require('http');
const httpPort = process.env.HTTP_PORT || 3001;
const hsts = require('hsts');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Set up Helmet for security headers
app.use(helmet()); 

// Set up CSRF protection
app.use(csurf({
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
    }
}));

// Force browser to use HTTPS
app.use(hsts({
    maxAge: 63072000,
    includeSubDomains: true, 
    preload: true
}));

// Middleware to log requests
app.use((req, res, next) => {
    res.locals.csurfToken = req.csrfToken();
    console.log(req.path, req.method);
    next();
});

// Register routes
app.use('/api/payment', paymentRoute);
app.use('/api/user', userRoute);  

// CSRF token endpoint
app.get('/api/csrf-token', (req, res) => {
    res.json({ csurfToken: req.csrfToken() });
});

// HTTPS setup
const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected successfully to MongoDB');
    })
    .catch((error) => {
        console.log(error);
    });

const PORT = process.env.PORT || 3000;
sslServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// Create HTTP server to redirect to HTTPS
const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
});

httpServer.listen(httpPort, () => {
    console.log(`HTTP server listening on port ${httpPort} and redirecting to HTTPS`);
});

const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Payment = require('../models/PaymentModel');

let csrfToken;
let cookie;

// Connect to MongoDB for testing and fetch the CSRF token
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Fetch the CSRF token before running the tests
    const response = await request(app).get('/api/csrf-token');
    csrfToken = response.body.csurfToken;
    cookie = response.headers['set-cookie'];
});

afterAll(async () => {
    await mongoose.connection.dropDatabase(); // Clean up the database
    await mongoose.connection.close(); // Close the connection
});
console.log('CSRF Token:', csrfToken);
console.log('Set-Cookie:', cookie);

describe('POST /api/payment', () => {
    it('should create a payment and return 201 status', async () => {
        const newPayment = {
            AccountNumber: '1234567890',
            currency: 'USD',
            amount: 100,
            provider: 'Visa',
            swiftCode: 'ABCDUS33'
        };

        const response = await request(app)
        .post('/api/payment')
        .set('Cookie', cookie) // Set the cookie in the header
        .set('csrf-token', csrfToken) // Set the CSRF token header
        .send(newPayment);;

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.AccountNumber).toBe(newPayment.AccountNumber);
        expect(response.body.currency).toBe(newPayment.currency);
        expect(response.body.amount).toBe(newPayment.amount);
        expect(response.body.provider).toBe(newPayment.provider);
        expect(response.body.swiftCode).toBe(newPayment.swiftCode);
    });
});

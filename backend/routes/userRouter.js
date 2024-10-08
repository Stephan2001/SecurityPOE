const express = require('express');
const { loginUser, signUp, logoutUser } = require('../Controllers/userController');
const ExpressBrute = require('express-brute');
const store = new ExpressBrute.MemoryStore();

const bruteforce = new ExpressBrute(store, {
    freeRetries: 5,
    minWait: 1000 * 60,
    maxWait: 1000 * 60 * 10,
    lifetime: 1000 * 60 * 10,
});

const router = express.Router();

router.post('/login', bruteforce.prevent, loginUser);
router.post('/signup', bruteforce.prevent, signUp);
router.post('/logout', logoutUser);

module.exports = router;
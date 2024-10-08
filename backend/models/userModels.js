const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');

// Create the user schema
const userSchema = new Schema({
    IDNumber: {
        type: String,
        required: true,
        unique: true,
        match: /^[A-Z0-9]{13}$/ // 8 alphanumeric characters
    },
    AccountNumber: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{10}$/ // 10 digits only
    },
    fullName: {
        type: String,
        required: true,
        match: /^[A-Za-z\s]+$/, // letters and spaces only
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum length for password
    }
}, { timestamps: true });

// Static method for user signup
userSchema.statics.signup = async function (IDNumber,fullName,password,AccountNumber) {
    
    console.log('IDNumber:', IDNumber);
    console.log('AccountNumber:', AccountNumber);
    console.log('fullName:', fullName);
    console.log('password:', password);
    // Check if all fields are filled
    if (!IDNumber || !AccountNumber || !fullName || !password) {
        throw new Error('All fields must be filled');
    }

    // Validate AccountNumber format
    if (!/^[0-9]{10}$/.test(AccountNumber)) {
        throw new Error('AccountNumber must be 10 digits long');
    }

    // Check password strength
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password is not strong enough');
    }

    // Check if user with the same IDNumber already exists
    const idExists = await this.findOne({ IDNumber });
    if (idExists) {
        throw new Error('IDNumber already in use');
    }

    // Check if user with the same AccountNumber already exists
    const accountExists = await this.findOne({ AccountNumber });
    if (accountExists) {
        throw new Error('AccountNumber already in use');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Sanitize inputs
    const sanitizedIDNumber = validator.escape(IDNumber);
    const sanitizedAccountNumber = validator.escape(AccountNumber);
    const sanitizedFullName = validator.escape(fullName);

    // Create and return the user
    const user = await this.create({ 
        IDNumber: sanitizedIDNumber, 
        AccountNumber: sanitizedAccountNumber, 
        fullName: sanitizedFullName, 
        password: hash 
    });
    return user;
};

userSchema.statics.login = async function (fullName, password) {
    // Validate if both fields are provided
    if (!fullName || !password) {
        throw new Error('All fields must be filled');
    }

    // Find the user by fullName
    const user = await this.findOne({ fullName });
    if (!user) {
        throw new Error('Incorrect full name or password');
    }

    // Compare the provided password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('Incorrect full name or password');
    }

    return user;
};


module.exports = mongoose.model('User', userSchema);

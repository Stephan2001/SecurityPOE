const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');

// Create a schema for the counters collection
const counterSchema = new Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

// Create the user schema
const userSchema = new Schema({
    IDNumber: {
        type: String,
        required: true,
        unique: true,
        match: /^[A-Z0-9]{8}$/ // 8 alphanumeric characters
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

// Function to get the next account number
async function getNextSequenceValue(sequenceName) {
    const counter = await Counter.findByIdAndUpdate(
        { _id: sequenceName },
        { $inc: { seq: 1 } },  // Increment the sequence
        { new: true, upsert: true }  // Create if not exists
    );
    return counter.seq;
}

userSchema.statics.signup = async function (IDNumber, fullName, password) {
    
    // Check if all fields are filled
    if (!IDNumber || !fullName || !password) {
        throw new Error('All fields must be filled');
    }

    // Check password strength
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password is not strong enough');
    }

    // Check if user with the same IDNumber already exists
    const exists = await this.findOne({ IDNumber });
    if (exists) {
        throw new Error('IDNumber already in use');
    }

    // Generate unique account number
    const AccountNumber = await getNextSequenceValue('accountNumber');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Sanitize inputs
    const sanitizedIDNumber = validator.escape(IDNumber);
    const sanitizedFullName = validator.escape(fullName);

    // Create and return the user
    const user = await this.create({ 
        IDNumber: sanitizedIDNumber, 
        AccountNumber, 
        fullName: sanitizedFullName, 
        password: hash 
    });
    return user;
};

module.exports = mongoose.model('User', userSchema);

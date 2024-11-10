const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcrypt')

// Create the user schema
const empSchema = new Schema(
  {
    AccountNumber: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{10}$/, // 10 digits only
    },
    fullName: {
      type: String,
      required: true,
      match: /^[A-Za-z\s]+$/, // letters and spaces only
      minlength: 3,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum length for password
    },
  },
  { timestamps: true }
)

// Password hashing middleware before saving -> temporary only used for initial creation
empSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(10) // Generate salt
    this.password = await bcrypt.hash(this.password, salt) // Hash password with salt
    next()
  } catch (error) {
    next(error)
  }
})

// Static method for login
empSchema.statics.login = async function (fullName, password) {
  // Validate if both fields are provided
  if (!fullName || !password) {
    throw new Error('All fields must be filled')
  }

  // Find the user by fullName
  const user = await this.findOne({ fullName })
  if (!user) {
    throw new Error('Incorrect full name or password')
  }

  // Compare the provided password with the stored hashed password
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw new Error('Incorrect full name or password')
  }

  return user
}

module.exports = mongoose.model('Employee', empSchema)

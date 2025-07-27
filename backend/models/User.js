const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is obligatory'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Invalid Email']
  },
  password: {
    type: String,
    required: [true, 'Password is obligatory'],
    minlength: 6
  }
}, {
  timestamps: true
});

// Hash pre save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Provera lozinke
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

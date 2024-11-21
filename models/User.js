const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String },
  password: { type: String },
  isTwoFactorAuthEnabled: { type: Boolean, default: false },
  twoFactorAuthSecret: { type: String },
});

module.exports = mongoose.model('User', UserSchema);

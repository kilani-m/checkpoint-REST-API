const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, uppercase: true, trim: true, required: true },
  dateNais: String,
  numTel: Number,
  email: { type: String, uppercase: true, trim: true, required: true }
});
module.exports = User = mongoose.model('user', userSchema);

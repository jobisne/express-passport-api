const mongoose = require('mongoose');
const userPlugin = require('./plugin');
module.exports = function () {

  const user = new mongoose.Schema({

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    name: { type: String, required: true },

    verificationHash: { type: String },

    emailVerified: { type: Boolean, default: false }
  });
    user.plugin(userPlugin);
  return mongoose.model('user', user);
};
const mongoose = require('mongoose');
const genericPlugin = require('../../helpers/generic-plugin')
const userPlugin = require('./plugin');

module.exports = function () {
  const user = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    properties: [{type: mongoose.Schema.Types.ObjectId, ref: 'property'}],
    tenants: [{type: mongoose.Schema.Types.ObjectId, ref: 'tenant', required: true }],
    subscriptions: [{type: mongoose.Schema.Types.ObjectId, ref: 'subscription'}],
    verificationHash: { type: String },
    emailVerified: { type: Boolean, default: false }
  });
  
  	user.plugin(genericPlugin);
    user.plugin(userPlugin);
  return mongoose.model('user', user);
};
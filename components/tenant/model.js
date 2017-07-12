const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const genericPlugin = require('../../helpers/generic-plugin');

module.exports = function () {
	const tenant = new mongoose.Schema({
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phoneNumber: { type: Number, required: true },
		property: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'property' },
		landlord: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user'},
		expireDate: { type: Date, default: Date.now }
	});
  
		tenant.plugin(genericPlugin);
	return mongoose.model('tenant', tenant);
}
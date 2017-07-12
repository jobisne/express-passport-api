const mongoose = require('mongoose');
const genericPlugin = require('../../helpers/generic-plugin');
mongoose.Promise = require('bluebird');

module.exports = function () {
	const property = new mongoose.Schema ({
		address: { type: String, required: true },
		tenants: [{type: mongoose.Schema.Types.ObjectId, ref: 'tenant', required: true }],
		landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
		description: { type: String, required: true }
	});

	  property.plugin(genericPlugin);
	return mongoose.model('property', property);
};
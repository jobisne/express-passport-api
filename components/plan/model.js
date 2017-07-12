const mongoose = require('mongoose');
const genericPlugin = require('../../helpers/generic-plugin');

module.exports = function () {
	const plan = new mongoose.Schema({
		name: { type: String, required: true },
		period:{ type: String, required: true },
		interval: { type: String, required: true, enum: ['week','monthly', 'annually'] },
		subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subscription' }]
	});
		plan.plugin(genericPlugin);
	return mongoose.model('plan', plan);
}

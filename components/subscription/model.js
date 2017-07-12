const mongoose = require('mongoose');
const genericPlugin = require('../../helpers/generic-plugin');

module.exports = function () {
	const subscription = new mongoose.Schema({
		plan: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'plan'  },
		landlord: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
		status: { type: String, required: true }
	});
  
	 subscription.plugin(genericPlugin);
  return mongoose.model('subscription', subscription);
}
module.exports = exports = function plugin(schema, options) {
	schema.add({ createdAt: {type: Date, 'default': Date.now } });
	schema.add({ upDatedAt: {type: Date, 'default': Date.now } });
	schema.add({ isDeleted: {type: Boolean, 'default': false } });
	schema.pre('save', function (next) {
		this.upDatedAt = Date.now();
		next();
	});
};
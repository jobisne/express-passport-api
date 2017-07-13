const express = require('express');
const ctrl = require('./controller');
const router = express.Router();

router.route('/encrypt')
	.get(ctrl.encrypt);
router.route('/decrypt')
	.get(ctrl.decrypt);

module.exports = router;
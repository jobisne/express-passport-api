const express = require('express');
const ctrl = require('./controller');
const isAuthenticated = require('../../middlewares/isAuthenticated');

// const isPerson = require('../../middlewares/isPerson');

const router = express.Router();

router.route('/')
  .post(ctrl.create)
  .get([isAuthenticated, ctrl.list]);
router.route('/:id')
  .all(isAuthenticated)
  .get(ctrl.read)
  .put(ctrl.update)
  .delete(ctrl.delete);

module.exports = router;
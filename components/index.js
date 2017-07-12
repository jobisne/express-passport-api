const UserRoutes = require('./user');
const Auth = require('./auth');
const propertyRoutes = require('./property');
const tenantRoutes = require('./tenant');
const subRoutes = require('./subscription');
const express = require('express');
const router = express.Router();

global._ = require('lodash');

router.get('/health-check', (req, res) => res.send('OK'));

router.use('/user', UserRoutes);
router.use('/login', Auth);
router.use('/property', propertyRoutes);
router.use('/tenant', tenantRoutes);
router.use('/subscription', subRoutes);

module.exports = router;
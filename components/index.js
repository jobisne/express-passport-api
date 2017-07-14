const UserRoutes = require('./user');
const Auth = require('./auth');
const propertyRoutes = require('./property');
const tenantRoutes = require('./tenant');
const subRoutes = require('./subscription');
const testRoute = require('./test');
const express = require('express');
const router = express.Router();

global._ = require('lodash');

router.get('/health-check', (req, res) => res.send('OK'));

router.use('/user', UserRoutes);
router.use('/auth', Auth);
router.use('/property', propertyRoutes);
router.use('/tenant', tenantRoutes);
router.use('/subscription', subRoutes);
router.use('/test', testRoute);

module.exports = router;
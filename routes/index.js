const express = require('express');
const router = express.Router();

console.log('router loaded');
// implementing the routes of users and reset password
router.use('/users',require('./user'));
router.use('/reset-password',require('./resetPass'));

module.exports = router;

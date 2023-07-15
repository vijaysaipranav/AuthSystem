const express = require('express');
const router = express.Router();

console.log('router loaded');

router.use('/users',require('./user'));
router.use('/reset-password',require('./resetPass'));

module.exports = router;

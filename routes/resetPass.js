const express = require('express');
const router = express.Router();
const passport = require('passport');
const resetController = require('../controllers/reset_password_controller');
// reset password routes
router.get('/',resetController.getRegisteredEmail) 
router.get('/:accessToken', resetController.getNewuserPassword)
// in this step itself we are going to gen access token and we will redirect the page to reset pass
router.post('/submit-email-for-identification',passport.checkEmail,resetController.sendEmailTOResetPass)
router.post('/:accessToken/update-password',resetController.updatePassword)

module.exports = router;
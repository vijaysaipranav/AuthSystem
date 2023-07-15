const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');

const usersController = require('../controllers/user_controller');

router.get('/profile',passport.checkAuthentication ,usersController.profile);

router.get('/sign-up', usersController.signUp);

router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/sign-in',failureFlash: true}), usersController.createSession );

router.get('/verify-email/:emailToken',usersController.verifyEmail)


 
 router.get('/sign-out',usersController.destroySession);
 
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in',failureFlash: true}),usersController.createSession)


 module.exports = router;
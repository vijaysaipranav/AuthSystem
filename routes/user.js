const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const usersController = require('../controllers/user_controller');

// this route displays users profile
router.get('/profile',passport.checkAuthentication ,usersController.profile);
// route to sigin-up
router.get('/sign-up', usersController.signUp);
// route to sigin-up
router.get('/sign-in', usersController.signIn);
// route to create a user 
router.post('/create', usersController.create);
// route to creating a session
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/sign-in',failureFlash: true}), usersController.createSession );
// route to verify email 
router.get('/verify-email/:emailToken',usersController.verifyEmail)


 // route to sigin-out
 router.get('/sign-out',usersController.destroySession);
  // routes  for google authentication
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in',failureFlash: true}),usersController.createSession)


 module.exports = router;
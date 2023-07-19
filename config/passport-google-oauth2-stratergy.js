// requireing all the necessary dependencies
const passport = require('passport');
const GoogleStratergy=require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User= require('../models/user');
const env = require('dotenv').config();

// tell passport to use a new stratergy for google login
passport.use(new GoogleStratergy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.SECRET,
    callbackURL: "http://localhost:8000/users/auth/google/callback"
  },
async function(accessToken, refreshToken, profile, done) {
  
    try{  
        let user = await User.findOne({email:profile.emails[0].value})
  
        console.log(profile);
        if(user){
            // if found set this user as req.user
            return done(null, user);
        }else{
            // if not found , create the user and set it as req.user
            user = await User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex'),
                isVerified:true,
            })
            
            return done(null, user);
            
        }
   }catch(err){
    console.log('error in google-stratergy-passport',err);
   }
   
  
  
}));


module.exports = passport;

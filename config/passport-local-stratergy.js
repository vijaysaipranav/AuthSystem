const passport =require('passport');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport 
passport.use(new localStrategy({
        usernameField: 'email',
    },
    async(email,password,done)=>{
        // find a user and establish the identity
       
        try{
            const user = await User.findOne({'email':email});
           
            if(!user){
                // console.log('Invalid Username ')
                return done(null,false,{message:'Invalid Username '});
            }
           const validPass = await bcrypt.compare(password,user.password)
            if(!validPass){
                // console.log('Invalid Password ');
                return done(null,false,{message:'Invalid Password '});
            }
            if(!user.isVerified){
                // console.log('Email not verified')
                return done(null,false,{message:'Check your email and verify your email'});
               }

            return done(null,user);


        }catch(err){
            console.log('Error in finding user -->');
            return done(err);
            
        }
            

    }));
   




// serialize the user to deccide which key is to be put in the cookies
passport.serializeUser(function(user,done){
    return done(null,user.id);
})


// deeserialize the user from the key in the cookies
passport.deserializeUser(async(id,done)=>{
    
        try{
            const user = await User.findById(id);
            return done (null,user);
        }catch(err){
            
            console.log('Error in finding user -->');
            return done(err);
            
        }
           
    });

// check if the user is authenticated
passport.checkAuthentication = async function(req,res,next){
    // if the user is signed in then pass on the req to the next function
    
    if(req.isAuthenticated()){
        
        return next();
    }
    // if the user is not signed in 
    return res.redirect('/users/sign-in')
}
passport.checkEmail=async (req,res,next)=>{
    const user = await User.findOne({ email: req.body.email});
    if(user){
        return next();
    }
    else{
        req.flash('error', 'Please enter your registered email');
        return res.redirect('/reset-password')
    }
}

passport.setAuthentication = function(req,res,next){
    if (req.isAuthenticated()){
        //req.user contains the current sigined user from the session cookie and we are just sending this to the locals for the views
        res.locals.user=req.user;
    }
    return next();

}


module.exports = passport
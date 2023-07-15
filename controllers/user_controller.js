const User = require ('../models/user');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const verifyEmail = require('../mailers/verify_email')
module.exports.profile = async(req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        return res.render('user_profile',{
            tittle:'User profile',
            profile_user: user,
        })
    }catch(err){
        console.log(err);
    }
} 

// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = async(req, res)=>{
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
   
        const user = await User.findOne({email: req.body.email});     

        if (!user){
            try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword= await bcrypt.hash(req.body.password,salt);
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                password:hashedPassword,
                emailToken:crypto.randomBytes(64).toString("hex"),

            });
            newUser.save();
            verifyEmail.sendingEmailToVerifyAccount(newUser);
            await req.flash('success', 'Check your email for verification of your emailadress');
            res.redirect('/users/sign-in');
            }
            catch(err){
                console.log('error in creating user while signing up'); 
            
            }   

               

        }else{
            return res.redirect('back');
        }
    
    

    ;
}

// sign in and create a session for the user
module.exports.createSession = async function(req, res){
    try{
        if(!req.body.create_session){
            req.session.cookie.originalMaxAge = 1000*5;
        }
        await req.flash('success', 'logged in successfully');
        return res.redirect(`/users/profile`);
    }catch(err){
        console.log(err);
    }
    
}

module.exports.destroySession = function(req, res,next){
    req.logout(function(err){
        if (err){return next(err);}
        
    });
    req.flash('success', 'You have logged out successfully');
    return res.redirect('back');
}

module.exports.verifyEmail = async(req,res)=>{
    try{
        const emailToken = req.params.emailToken;
        if(!emailToken){
            await req.flash('error', 'There was an error while registering your email ');
            return res.redirect('/users/sign-up')
        }
        const user = await User.findOne({emailToken:req.params.emailToken});
        if(user){
            user.emailToken=null;
            user.isVerified =true;

            await user.save();
            await req.flash('success', 'Your Email is verified successfully');
            return res.redirect('/users/sign-in')
        }else{
            await req.flash('error', 'Your Email is not verfied kindly check your email address');
            return res.redirect('/users/sign-in')
        }
    }catch(err){
        console.log(err);
        
    }
}
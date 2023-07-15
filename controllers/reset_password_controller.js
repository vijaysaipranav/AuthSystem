const crypto = require('crypto');
const User = require ('../models/user');
const resetUser = require('../models/resetUser');
const bcrypt = require('bcryptjs');
const resetPassword = require('../mailers/reset_password');

module.exports.sendEmailTOResetPass = async (req,res)=>{

    const resetuserexists = await resetUser.exists({refEmail:req.body.email});
    const resetuser = await resetUser.findOne({refEmail:req.body.email});
    console.log(resetuserexists)
    if(!resetuserexists){
        try{
            const user = await User.findOne({email:req.body.email});
            
            const newResetUser = new resetUser({
                refEmail:req.body.email,
                accessToken:crypto.randomBytes(64).toString("hex"),
                isValid:true,
            })
            newResetUser.save();
            
            resetPassword.resetPasswordEmail(newResetUser,user);
            await req.flash('success', 'Check your email to reset password');
            res.redirect('/users/sign-in');
        }catch(err){
            console.log(err);
        }
    }else{
        
        if(!resetuser.isValid){
            const user = await User.findOne({email:resetuser.refEmail});
            resetuser.accessToken=crypto.randomBytes(64).toString("hex");
            resetuser.isValid = true;
            
            resetuser.save();
            resetPassword.resetPasswordEmail(resetuser,user);
            await req.flash('success', 'Check your email to reset password');
            res.redirect('/users/sign-in');
    }else{
        await req.flash('error', 'we have already sent you a email to reset password');
        return res.redirect('/users/sign-in');
    }
    }
   
}


module.exports.getRegisteredEmail = async(req,res)=>{
    
    return res.render('user_email_for_identification')
}
module.exports.getNewuserPassword = async(req,res)=>{
    const accessToken= req.params.accessToken;
    const tokenExists = await resetUser.exists({accessToken:accessToken});
    if(tokenExists){
        return res.render('reset_password',{
            accessToken:accessToken
        });
    }else{
        await req.flash('error', 'your link has been expired please try again');
        return res.render('user_email_for_identification')
    }
    
}
module.exports.updatePassword = async(req,res)=>{
    if (req.body.password != req.body.confirm_password){
        return res.redirect('/users/sign-in');
    }
    const updateUser = await resetUser.findOne({accessToken:req.params.accessToken})
    const userExists = await resetUser.exists({accessToken:req.params.accessToken})
    const userInfo = await User.findOne({email:updateUser.refEmail})
    if (userExists){
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword= await bcrypt.hash(req.body.password,salt);
            userInfo.password = hashedPassword;
            userInfo.save();
            await req.flash('success', 'Password changed successfully');
            await resetUser.deleteMany({accessToken:req.params.accessToken});
            return res.redirect('/users/sign-in')
        }catch(err){
            console.log(err);
            await req.flash('error', 'Something went wrong');
            return res.render('user_email_for_identification')
        }
    }else{
        await req.flash('error', 'Something went wrong , try again later');
        return res.render('user_email_for_identification')
    }
    
}

    

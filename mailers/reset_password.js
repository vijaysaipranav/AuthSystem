const nodemailer= require('../config/nodemailer');

// this function helps in sending mail to clients or users 
exports.resetPasswordEmail= async (resetUser,user)=>{
    try{
        let htmlString = nodemailer.renderTemplate({resetUser:resetUser},'/reset_password_template.ejs');
        console.log(`Sending email to ${user.name} to reset password`);
        const info = await nodemailer.transporter.sendMail({
            from:'games310801@gmail.com',
            to:resetUser.refEmail,
            subject:'Reset Password',
            html:htmlString,
        })
        console.log('Message sent',info);
        return;
    }catch(err){
        console.log('Error in reset_password.js file',err);
        return;
    }
    
}
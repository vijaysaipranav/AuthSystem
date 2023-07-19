const nodemailer= require('../config/nodemailer');

// this is another way of exporting method
// this function helps in sending mail to clients or users for email verification
exports.sendingEmailToVerifyAccount = async (user)=>{
    try{
        let htmlString=nodemailer.renderTemplate({user:user},'/verify_email.ejs')

        console.log(`Verifying the email of the username: ${user.name}` );
        const info = await nodemailer.transporter.sendMail({
            from:'games310801@gmail.com',
            to:user.email,
            subject:'Email verification',
            html:htmlString,

        })
        console.log('Message sent',info);
        return;
    }catch(err){
        console.log('Error in verify_email.js file',err);
        return;
    }
    
}
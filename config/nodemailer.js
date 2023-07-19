// setting configurations for sending mainls for nodemailer

const nodemailer = require('nodemailer');
const ejs = require('ejs')
const path =  require('path');

// creating a transporter for nodemailer
let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'games310801@gmail.com',
        pass:'xdpodjuagposyooo'
    }

});

// setting rendering template while sending emails 
let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('Error in the nodemailer file',err);
            }
            mailHTML = template;
        }
    )
    return mailHTML;

}

module.exports ={
    transporter: transporter,
    renderTemplate:renderTemplate
}
# AuthSystem
This is a basic authentication system for sign-in and sign-up it also contains google authentication. and this file is a Readme file for this Web Application.It's a Web App built with Node.js ,EJS,MongoDB,ExpressJs. 

# Contributed By:- Pranav
#Folder Structure:-

```
AuthSystem
├── .env
├── assets
│   ├── css
│   │   ├── profile.css
│   │   └── test.css
│   ├── images
│   ├── js
│   │   └── showPassword.js
│   └── scss
│       ├── profile.scss
│       └── test.scss
├── config
│   ├── middleware.js
│   ├── mongoose.js
│   ├── nodemailer.js
│   ├── passport-google-oauth2-stratergy.js
│   └── passport-local-stratergy.js
├── controllers
│   ├── reset_password_controller.js
│   └── user_controller.js
├── generateTree.js
├── index.js
├── mailers
│   ├── reset_password.js
│   └── verify_email.js
├── models
│   ├── resetUser.js
│   └── user.js
├── package-lock.json
├── package.json
├── README.md
├── routes
│   ├── index.js
│   ├── resetPass.js
│   └── user.js
└── views
    ├── layout.ejs
    ├── mailers
    │   ├── reset_password_template.ejs
    │   └── verify_email.ejs
    ├── reset_password.ejs
    ├── user_email_for_identification.ejs
    ├── user_profile.ejs
    ├── user_sign_in.ejs
    ├── user_sign_up.ejs
    ├── _footer.ejs
    └── _header.ejs
```
# Features of this App:-

1. Sign up with email
2. Sign in (you can redirect to a blank home page with a sign out and reset password button after sign in)
3. Sign out 
4. Reset password after sign in
5. The password stored in the db should be encrypted
6. Google login/signup (Social authentication)
7. Forgot password (you can either generate a random password and send on email, or send a reset password link which expires in some time [preferred])
8. Display notifications.
# Getting Started:-
# Prerequisites:-
```
Node.js
MongoDB
Express
Mongoose
```
# Installation Steps:-
1. Clone the repository:-
```
git clone https://github.com/vijaysaipranav/AuthSystem.git
```
2. Install the dependencies:
```
cd AuthSystem
npm install
```
3. Configure the database connection:
In server.js use your own mongoDB username and Password from connection string of MongoDB Campus or Cloud MongoDB to configure the DB connection.
4. Start the application:
```
npm start
```
5. Open your web browser and visit [http://localhost:8000/users/sign-up](url) to access the Authentication system.

# Contributing:
Contributions are most easily and thankfully welcome! If you'd like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Make the necessary changes and commit them.
4. Push the changes to your forked repository.
5. Submit a pull request explaining the changes you've made.

# Acknowledgements:
The libraries and resources that you used in the development of this project are Visual Studio Code and MongoDB Cloud database finally with render for deployment.
# Contact:

1. Email - [vijaysaipranavt@gmail.com](url)
2. Project Link - [https://github.com/vijaysaipranav/AuthSystem.git](url)

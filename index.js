const express = require('express');
const port= 8000;
const app = express();
const db =require('./config/mongoose')
const expressLayouts=require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratergy')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const coustomMWare = require('./config/middleware')
const passportGoogle = require('./config/passport-google-oauth2-stratergy')



app.use(express.json());

app.use(express.urlencoded({extended:false}));
app.use(cookieParser())

app.use(express.static('./assets'));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// set view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongostore is used to store the session cookie in the db
app.use(session({
    name:'loginPage',
    //Todo change the secret before the deployment process
    secret: 'anything',
    saveUninitialized:false,
    resave:false,
    cookie:{
        
        maxAge:1000*60*20,
    },
    store : MongoStore.create(
        {
        mongoUrl:'mongodb://127.0.0.1:27017/login_system_db',
        autoRemove:'disabled',
        },
        function(err){
            console.log(err ||'connect-mongodb setup ok')
        }
        
    
    ),
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthentication);
app.use(flash());
app.use(coustomMWare.setFlash);

// import routes
const routes = require('./routes/index');
app.use('/', routes);




app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`The server is running on ${port}`)
})
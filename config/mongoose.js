// connecting with mongoDB server
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODBURL);
const db = mongoose.connection;
db.on('error',console.error.bind(console,'Error connecting to DB'));
db.once('open',()=>{
    console.log('Connected to MongoDB')
});

module.exports =db;
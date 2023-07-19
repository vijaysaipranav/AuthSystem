const mongoose = require('mongoose');
// schema for resetting password 
const resetUserSchema = new mongoose.Schema({
    refEmail:{
        type: String,
        required: true,
        unique: true,
    }
    ,
    accessToken:{
        type:String
    },
    isValid:{
        type:Boolean,
        default:true,
    },
    expireAt: {
        type: Date,
        /* Defaults 10 mins from now */
        default: new Date(new Date().valueOf() + (1000*60*10)),
        
        
      }
},{
    timestamps:true
})
const ResetUser = mongoose.model('resetUser',resetUserSchema);
module.exports=ResetUser;
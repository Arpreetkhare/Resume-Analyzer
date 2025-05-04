const mongoose = require("mongoose");
// const { type } = require("os");
const { v4: uuidv4 } = require("uuid");


const userSchema = mongoose.Schema(
    {
        userID: {
            type:String,
            required:false,
            default: uuidv4,
            unique:true,
        },
      
        
        username: {
            type:String,
            required: true,
            unique:true,
        },

        password: {
            type:String,
            required: true,
            
        },

        email: {
            type:String,
            required: true,
            unique:true,
        }
    }
)

module.exports = mongoose.model("User" , userSchema);
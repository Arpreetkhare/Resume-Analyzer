const bcrypt = require ("bcrypt");
const User = require("../models/user-model");
const { error } = require("console");
const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();





async function hashPass(password) {
    `utill function to make password hash;
    param : password as a paramenter;`

    const hashPassword = await bcrypt.hash(password,10);
    return hashPassword;

    
}

async function comparePass(password , storedPass) {

    `utill function to compare password with server password;
    param1 : password as a paramenter
    para2 : stored password ( which already there is server);`


   

    return await bcrypt.compare(password, storedPass);
    
}

async function createToken(payload){
    return jwt.sign(payload ,process.env.jwt_secret , {expiresIn : "1h"});

}



module.exports = { hashPass , comparePass , createToken };
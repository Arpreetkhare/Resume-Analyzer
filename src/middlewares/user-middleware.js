
const verify = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const {StatusCodes} = require("http-status-codes");
require("dotenv").config();

console.log(process.env.jwt_secret);

async function validateToken(req,res,next){
    const authHeader = req.get("authorization");
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Missing or invalid token format" });
    }

    const token = authHeader.split(" ")[1];
    console.log("token " , token);
    console.log( "key " ,process.env.jwt_secret);

    jwt.verify(token , process.env.jwt_secret ,(err , decoded)=>{
        if(err){
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid or expired token", error: err.message });

        }
        if(!decoded || !decoded.username){
            return res.status(StatusCodes.BAD_REQUEST).json({Message : "token is missing user information!", error : err.message});
        }

        req.userID= decoded.userID;
        req.username =  decoded.username;
        next();
    });


    

}

module.exports = { validateToken };



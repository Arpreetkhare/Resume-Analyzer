const User = require("../models/user-model");



`crud function to get user from database with specific username;`
async function getUserByUsername(username){

    ///mongo query to find user with username;
    const user = await User.findOne({username});
    
    

    return user;


}

async function getUserByUserId(userID){

    ///mongo query to find user with username;
    const user = await User.findOne({userID});
    

    return user;


}

async function getAll() {
    const allUsers=await User.find({},"-password");
    return allUsers;
}

module.exports = { getUserByUserId , getUserByUsername ,getAll } ;
    



// const { register } = require("module");
const User = require("../models/user-model");
const {getUserByUserId , getUserByUsername , getAll } = require("../crud/user-Crud");
const { hashPass , comparePass ,createToken} = require("../utils/user-Util");
const {StatusCodes} = require("http-status-codes");


async function registerUser(req , res){
    try{
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ Message: "All fields are required!" });
        }

       /// getiing user with crud fuction {getUser};
        const user = await getUserByUsername(username);
        // console.log("user " , user);


        /// cheacking if user already there or not;
        if(user){
            res.status(StatusCodes.CONFLICT).json({ Message: "User already exists!" });
        }

        /// hashing pass before in process of creating user;

        const hashPassword = await hashPass(password);
        // console.log("hashpassword " , hashPassword);

        /// creating user;
        const newUser = new User({
            username,
            email ,
            password : hashPassword,

        });

        /// saving user into database'
        await newUser.save();

        /// returning saved user;
        return res.status(StatusCodes.CREATED).json({ message: "User registered successfully", user: newUser });

        

    }
    catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Message: error.message });


    }
}


async function loginUser(req,res) {
    try{
        /// req body;
       const  {username , password} = req.body;

       if(!username || !password){
        res.status(StatusCodes.BAD_REQUEST).json({Message : "All fields  are required!"})

       }
       /// getiing user with crud fuction {getUser};
       const user = await getUserByUsername(username);

       /// comparing password to password which inside server;
       await comparePass(password , user.password);

        const payload = {
            username : user.username,
            userID:user.userID,
        };

       const token = await createToken(payload);

       

       /// returning user;
       return res.status(StatusCodes.OK).json({ message: "Login successful", token });


    }

        
    catch (error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
    
} 


async function updateUser(req,res) {
    try{
       /// getiing user with crud fuction {getUser};
        const user = await getUserByUsername(req.body.username);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ Message: "User not found!" });
        }
        
        ///updating user with req data;
        user.username=req.body.username|| user.username;
        user.email=req.body.email|| user.email;

        /// hashing passwrod while updateing;
        if(req.body.password){
            user.password = await hashPass(req.body.password);
        }
       
        // user saving!
        await user.save();

        return res.status(StatusCodes.OK).json({ Message: "User updated successfully!", user });


        

    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Message: "An error occurred", details: error.message });
    }
    
}


async function deleteUser(req,res) {
    try{
        /// getiing user with crud fuction {getUser};
        // const user = await getUser(req.params.username);
        const user = await getUserByUserId(req.params.userID);
        console.log(user);

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ Message: "User not found!" });
        }
        // console.log("user " , user);

       /// remove user with got username!
        await user.deleteOne();
        return res.status(StatusCodes.OK).json({ Message: "User deleted successfully!" });


    }
    catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Message: "An error occurred", details: error.message });
    }


    
}

async function getAllUsers(req,res) {
    try {
        //getting all users
        const allUsers= await getAll();
        if(!allUsers){
            return res.status(StatusCodes.NOT_FOUND).json({ Message: "No user!" });
        }

        return res.status(StatusCodes.OK).json({data: allUsers});

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Message: "An error occurred", details: error.message });
    }
}



module.exports = { registerUser , loginUser , deleteUser , updateUser , getAllUsers};

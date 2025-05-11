
const express = require("express");
const {validateToken} = require("../middlewares/user-middleware");
const {isAdmin} = require("../middlewares/admin-middleware");

const userRouter = express.Router();
const {
    registerUser , loginUser, updateUser , deleteUser , getAllUsers , currentUser
} = require("../controllers/user-Controller");

// Register
userRouter.post("/register",registerUser);

// Login
userRouter.post("/login" , loginUser);

// Update user by username
userRouter.put("/update" , validateToken , updateUser);

// Delete user by username
userRouter.delete("/delete" , validateToken , deleteUser);


//For the admin only routes

userRouter.get("/users", validateToken , isAdmin , getAllUsers);

userRouter.get("/currUser" , validateToken , currentUser);




module.exports = userRouter;


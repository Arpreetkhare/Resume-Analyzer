
const express = require("express");
const {validateToken} = require("../middlewares/user-middleware");
const {isAdmin} = require("../middlewares/admin-middleware");

const userRouter = express.Router();
const {
    registerUser , loginUser, updateUser , deleteUser , getAllUsers
} = require("../controllers/user-Controller");

// Register
userRouter.post("/register",registerUser);

// Login
userRouter.post("/login" , loginUser);

// Update user by username
userRouter.put("/update" , validateToken , updateUser);

// Delete user by username
userRouter.delete("/delete/:userID" , validateToken , deleteUser);


//For the admin only routes

userRouter.get("/users", validateToken , isAdmin , getAllUsers);




module.exports = userRouter;


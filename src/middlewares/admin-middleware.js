const {getUserByUserId} = require('../crud/user-Crud');
async function isAdmin(req,res,next){
    const user=await getUserByUserId(req.userID);
    if(user.role !== 'admin'){
        return res.status(403).json({message: "Access Denied: Admins only"});
    }
    next();
}

module.exports = { isAdmin };
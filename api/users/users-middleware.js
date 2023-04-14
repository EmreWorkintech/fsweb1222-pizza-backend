const User = require('./users-model');

const checkUser = async (req,res,next)=> {
    try {
       const registeredUser = await User.getByFilter({email: req.body.email});
       if (registeredUser) {
            req.user = registeredUser;
            next()
       } else {
            next({status:403, message: "Invalid credentials..."})
       }
    } catch(err) {
        next({status:500, message: "Payload error"})
    }
}

module.exports = {
    checkUser
}
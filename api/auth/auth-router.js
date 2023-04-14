const router = require('express').Router();
const User = require('../users/users-model');
const authMd = require('./auth-middleware');
const userMd = require('../users/users-middleware');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../../config/config')

router.post('/login', authMd.checkLoginPayload, userMd.checkUser, authMd.checkPassword, async (req,res)=> {
    const token = generateToken(req.user);
    res.json({message: `Merhaba ${req.user.name}, tekrar hoş geldin...`, token})
})

router.post('/register', authMd.checkPayload, authMd.hashPassword, async (req,res)=> {
    const payload = req.body;
    const newUser = await User.create(payload);
    res.json(newUser)
})

router.put('/password', (req,res)=> {
    res.json('password reset')
})

function generateToken(user) {
    const payload = {
        user_id: user.id,
        role: user.role_name
    }
    const options = {
        expiresIn: '8h'
    }
    const token = jwt.sign(payload, JWT_SECRET, options);
    return token;
}


module.exports = router;
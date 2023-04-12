const router = require('express').Router();
const User = require('../users/users-model');

router.post('/login', async (req,res)=> {
    const registeredUser = await User.getByFilter({email: req.body.email});
    if(registeredUser && registeredUser.password == req.body.password) {
        res.json({message: `Merhaba ${registeredUser.name}, tekrar hoş geldin...`})
    } else {
        res.status(403).json({message: 'Invalid credentials!..'})
    }
})

router.post('/register', async (req,res)=> {
    const payload = req.body;
    const newUser = await User.create(payload);
    res.json(newUser)
})

router.put('/password', (req,res)=> {
    res.json('password reset')
})

module.exports = router;
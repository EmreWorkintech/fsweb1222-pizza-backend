const router = require('express').Router();

router.post('/login', (req,res)=> {
    res.json('login')
})

router.post('/register', (req,res)=> {
    res.json('register')
})

router.put('/password', (req,res)=> {
    res.json('password reset')
})

module.exports = router;
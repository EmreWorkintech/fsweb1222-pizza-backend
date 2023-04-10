const router = require('express').Router();

router.get('/', (req,res)=> {
    res.json('get all users')
})

router.get('/:id', (req,res)=> {
    res.json('get user by id')
})

router.post('/', (req,res)=> {
    res.json('create user')
})

router.put('/:id', (req,res)=> {
    res.json('update user')
})

router.delete('/:id', (req,res)=> {
    res.json('delete user')
})


module.exports = router;
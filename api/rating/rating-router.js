const router = require('express').Router();


router.post('/', (req,res)=> {
    res.json('create rating')
})

router.put('/:id', (req,res)=> {
    res.json('update rating')
})

router.delete('/:id', (req,res)=> {
    res.json('delete rating')
})


module.exports = router;
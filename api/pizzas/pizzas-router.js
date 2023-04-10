const router = require('express').Router();

router.get('/', (req,res)=> {
    res.json('get all pizzas')
})

router.get('/:id', (req,res)=> {
    res.json('get pizza by id')
})

router.post('/', (req,res)=> {
    res.json('create pizza')
})

router.put('/:id', (req,res)=> {
    res.json('update pizza')
})

router.delete('/:id', (req,res)=> {
    res.json('delete pizza')
})


module.exports = router;
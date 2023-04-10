const router = require('express').Router();

router.get('/', (req,res)=> {
    res.json('get all orders')
})

router.get('/:id', (req,res)=> {
    res.json('get prder by id')
})

router.post('/', (req,res)=> {
    res.json('create order')
})

router.put('/:id', (req,res)=> {
    res.json('update order')
})

router.delete('/:id', (req,res)=> {
    res.json('delete order')
})


module.exports = router;
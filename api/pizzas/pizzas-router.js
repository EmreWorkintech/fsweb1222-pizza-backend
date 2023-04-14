const router = require('express').Router();
const Pizza = require('./pizzas-model');

router.get('/', async (req,res)=> {
    const pizzas = await Pizza.getAll();
    res.json(pizzas);
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
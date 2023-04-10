const router = require('express').Router();

router.get('/', (req,res)=> {
    res.json('get all malzemeler')
})

router.get('/:id', (req,res)=> {
    res.json('get malzeme by id')
})

router.post('/', (req,res)=> {
    res.json('create malzeme')
})

router.put('/:id', (req,res)=> {
    res.json('update malzeme')
})

router.delete('/:id', (req,res)=> {
    res.json('delete malzeme')
})

module.exports = router;
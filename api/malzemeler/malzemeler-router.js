const router = require('express').Router();
const Malzeme = require('./malzemeler-model');

router.get('/', async (req,res)=> {
    const malzemeler = await Malzeme.getAll();
    res.json(malzemeler)
})

router.get('/:id', async (req,res)=> {
    const malzeme = await Malzeme.getById(req.params.id);
    if(malzeme) {
        res.json(malzeme)
    } else {
        res.status(400).json({message: `${req.params.id}'li malzeme bulunamadı...`})
    }
})

router.post('/', async (req,res)=> {
    const malzeme = await Malzeme.create(req.body);
    res.status(201).json(malzeme)
})

router.put('/:id', async (req,res)=> {
    const count = await Malzeme.update(req.body, req.params.id);
    res.json({message: `${count} malzeme güncellendi...`})
})

router.delete('/:id', async (req,res)=> {
    const count = await Malzeme.remove(req.params.id);
    res.json({message: `${count} malzeme silindi...`})
})

module.exports = router;
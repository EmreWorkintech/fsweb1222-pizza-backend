const router = require('express').Router();
const Orders = require('./orders-model');

router.get('/', async (req,res)=> {
    const orders = await Orders.getAll();
    res.json(orders)
})

router.get('/:id', async (req,res)=> {
    const order = await Orders.getById(req.params.id);
    if(order) {
        res.json(order)
    } else {
        res.status(400).json({message: `${req.params.id}'li order bulunamadı...`})
    }
})

router.post('/', async (req,res)=> {
    const payload = req.body;
    payload.status = 'Sipariş hazırlanıyor';
    payload.user_id = 2;
    const order = await Orders.create(payload);
    res.status(201).json(order);
})

router.put('/:id', async (req,res)=> {
    const payload = req.body;
    payload.status = 'Sipariş hazırlanıyor';
    payload.user_id = 2;
    const count = await Orders.update(payload, req.params.id);
    res.status(201).json({message: `${req.params.id} id'li order güncellendi...`});
})

router.delete('/:id', async (req,res)=> {
    const count = await Orders.remove(req.params.id);
    res.json({message: `${count} order silindi...`})
})


module.exports = router;
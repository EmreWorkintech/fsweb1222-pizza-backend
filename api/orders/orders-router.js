const router = require('express').Router();
const Orders = require('./orders-model');

router.get('/', (req,res)=> {
    res.json('get all orders')
})

router.get('/:id', (req,res)=> {
    res.json('get prder by id')
})

router.post('/', async (req,res)=> {
    const newOrder = {
        pizza_id: 1, 
        hamur: 'Kalın',
        price: 85.50,
        adet: 1,
        status:'Hazırlanıyor',
        boyut: 'Büyük'
        }
    const order = await Orders.create(newOrder);
    res.json(order);
})

router.put('/:id', (req,res)=> {
    res.json('update order')
})

router.delete('/:id', (req,res)=> {
    res.json('delete order')
})


module.exports = router;
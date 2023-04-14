const Order = require('./orders-model');

const checkId = (id) => async (req,res,next)=> {
    try {
        const order = await Order.getById(id);
        if(order){
            req.order = order;
        } else {
            next({status:400, message: `${id} id'li order bulunamadı!..`})
        }
    } catch(err) {
        next(err)
    }
}

module.exports = {
    checkId
}
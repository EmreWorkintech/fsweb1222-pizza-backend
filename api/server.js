const express = require('express');
const server = express();

const userRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const orderRouter = require('./orders/orders-router');
const malzemeRouter = require('./malzemeler/malzemeler-router');
const pizzaRouter = require('./pizzas/pizzas-router');
const ratingRouter = require('./rating/rating-router');

const { restricted, checkRole } = require('./auth/auth-middleware');

server.use(express.json());
server.use('/api/auth', authRouter);
server.use('/api/user', restricted, checkRole('admin'), userRouter);
server.use('/api/order', restricted, orderRouter);
server.use('/api/malzeme', restricted, checkRole('admin'), malzemeRouter);
server.use('/api/pizza', restricted, checkRole('admin'), pizzaRouter);
server.use('/api/rating', restricted, ratingRouter);

server.use((err,req,res,next)=>{
    console.log(err);
    res
        .status(err.status || 500)
        .json({
            message: err.message && "Server Error",
            stack: err.stack || "No details added."
        })
})

module.exports = server;
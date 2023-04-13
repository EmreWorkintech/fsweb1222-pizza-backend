const express = require('express');
const server = express();

const userRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const orderRouter = require('./orders/orders-router');
const malzemeRouter = require('./malzemeler/malzemeler-router');
const pizzaRouter = require('./pizzas/pizzas-router');
const ratingRouter = require('./rating/rating-router');

server.use(express.json());
server.use('/api/auth', authRouter);
server.use('/api/user', userRouter);
server.use('/api/order', orderRouter);
server.use('/api/malzeme', malzemeRouter);
server.use('/api/pizza', pizzaRouter);
server.use('/api/rating', ratingRouter);

server.use((err,req,res,next)=>{
    console.log(err);
    res
        .status(err.status || 500)
        .json({
            message: err.message || "Server Error",
            stack: err.stack || "No details added."
        })
})

module.exports = server;
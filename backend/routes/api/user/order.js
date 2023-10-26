const express = require('express');
const {  orderProduct, getOrders } = require('../../../controller/users/myOrders');

const OrdersRoutes = express.Router()


OrdersRoutes.get('/getOrders',  getOrders)
    .post('/orderProduct', orderProduct)



module.exports = { OrdersRoutes }
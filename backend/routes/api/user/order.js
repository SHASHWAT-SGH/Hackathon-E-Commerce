const express = require('express');
const { check, orderProduct, getOrders } = require('../../../controller/users/myOrders');

const OrdersRoutes = express.Router()


OrdersRoutes.get('/getOrders', check, getOrders)
    .post('/orderProduct', check, orderProduct)



module.exports = { OrdersRoutes }
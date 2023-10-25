const express = require('express');
const { addToCart, getCart, check, deleteOneFromCart, deleteAllFromCart } = require('../../../controller/users/cart');

const CartRoutes = express.Router()


CartRoutes.get('/getCart', check, getCart)
    .post('/addToCart', check, addToCart)
    .post('/deleteOneFromCart', check, deleteOneFromCart)
    .delete('/deleteAllFromCart', check, deleteAllFromCart)



module.exports = { CartRoutes }
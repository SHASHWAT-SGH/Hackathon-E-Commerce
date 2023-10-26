const express = require('express');
const { productRoutes } = require('./product/products');
const { UserRoutes } = require('./user/users');
const { WishlistRoutes } = require('./user/wishlist');
const { CartRoutes } = require('./user/cart');
const { OrdersRoutes } = require('./user/order');

const protectedApiRoutes = express.Router()
const unprotectedApiRoutes = express.Router()

protectedApiRoutes.use('/',
    UserRoutes,WishlistRoutes,CartRoutes,OrdersRoutes
)
unprotectedApiRoutes.use('/',
    productRoutes
)

module.exports = { protectedApiRoutes,unprotectedApiRoutes }
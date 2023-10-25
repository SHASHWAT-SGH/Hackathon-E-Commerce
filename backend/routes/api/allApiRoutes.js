const express = require('express');
const { productRoutes } = require('./product/products');
const { UserRoutes } = require('./user/users');
const { WishlistRoutes } = require('./user/wishlist');
const { CartRoutes } = require('./user/cart');

const protectedApiRoutes = express.Router()
const unprotectedApiRoutes = express.Router()

protectedApiRoutes.use('/',
    UserRoutes,WishlistRoutes,CartRoutes
)
unprotectedApiRoutes.use('/',
    productRoutes
)

module.exports = { protectedApiRoutes,unprotectedApiRoutes }
const { Cart } = require("../../model/cart");
const { Product } = require("../../model/products");
const { Wishlist } = require("../../model/wishlist");


// **NOTE** we are finding user's whishlist by object UID and not email is due to security issues 

// checking if the wishlist exists and creating one if not
const check = async (req, res, next) => {
    await Cart.exists({ uid: req.session.passport.user.id }).then((userWishlist) => {
        if (!userWishlist) {
            const cart = new Cart({ uid: req.session.passport.user.id, user: req.session.passport.user.email })
            cart.save()
            next()
        } else {
            next()
        }
    }).catch((err) => { res.send(err) })
}

// getting the user wishlist
const getCart = (req, res, next) => {

    Cart.findOne({ uid: req.session.passport.user.id })
        .populate({
            path: 'products.product', // 'products' refers to the products array in CartSchema, and 'product' refers to the reference field in the product object.
            model: Product, // Reference the Product model.
        }).exec().then(cart => {
            if (!cart) res.send(cart)
            else { res.send(cart) }
        })
}

// add to cart
// the code uses the "some()" (we can use "find()" as well)  function to iterate over the wishlist.products array and checks if any element in the array is equal to the productId using the equals() method of the ObjectId class. This allows you to compare ObjectIds directly.
const addToCart = async (req, res, next) => {
    const { productId, count } = req.body;

    try {
        const cart = await Cart.findOne({ uid: req.session.passport.user.id });

        const existingProductIndex = cart.products.findIndex(product => product.product.equals(productId));

        if (existingProductIndex === -1) {
            cart.products.push({ product: productId, count });
        } else {
            cart.products[existingProductIndex].count = count;
        }

        await cart.save();
        res.send('Product added to the cart');

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// delete one from the Wishlist
const deleteOneFromCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ uid: req.session.passport.user.id });
        const productId = req.body.productId; 

        const productIndex = cart.products.findIndex(product => product.product.equals(productId));

        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            await cart.save();
            res.send('Product removed from the cart');
        } else {
            res.send('Product is not in the cart');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// delete all from the Wishlist
const deleteAllFromCart = (req, res, next) => {
    Cart.findOne({ uid: req.session.passport.user.id })
        .then(async cart => {
            cart.products = []
            cart.save()
            res.send('All items from the cart has been deleted successfully')
        });
}

module.exports = { check, getCart, addToCart, deleteOneFromCart, deleteAllFromCart, }
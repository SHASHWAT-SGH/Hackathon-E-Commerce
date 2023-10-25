const { Cart } = require("../../model/cart");
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
            path: 'products',
            match: { isArchive: false },
            populate: {
                path: 'postedBy',
                model: 'User',
                select: '-password -_id -accountId -provider'
            },
        }).exec().then(cart => {
            if (!cart) res.send('cart not found')
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
            cart.products[existingProductIndex].count += count;
        }

        await cart.save();
        res.send('Product added to the cart');

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// delete one from the Wishlist
const deleteOneFromWishlist = (req, res, next) => {
    Wishlist.findOne({ uid: req.session.passport.user.id })
        .then(async wishlist => {
            const itemIndex = wishlist.products.indexOf(req.query.productId)
            if (itemIndex !== -1) {
                wishlist.products.splice(itemIndex, 1)
                wishlist.save()
                res.send('deleted from the wishlist')
            }
            else {
                res.send('is not in the wishlist')
            }
        })
        .catch(error => {
            res.send(error);
        });
}


// delete all from the Wishlist
const deleteAllFromWishlist = (req, res, next) => {
    Wishlist.findOne({ uid: req.session.passport.user.id })
        .then(async wishlist => {
            wishlist.products = []
            wishlist.save()
            res.send('All items from the wishlist has been deleted successfully')


            //this one not working because array contains instances here
            //     if(wishlist.products!==){
            //         wishlist.products = []
            //         wishlist.save()
            //         res.send('All items from the wishlist has been deleted successfully')
            //     }else{
            //         res.send('Wishlist already empty!')
            //     }
            // })
            // .catch(error => {
            //     res.send(error);
        });
}

module.exports = { check, getCart, addToCart, deleteOneFromWishlist, deleteAllFromWishlist, }
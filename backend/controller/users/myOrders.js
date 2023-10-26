

// **NOTE** we are finding user's whishlist by object UID and not email is due to security issues 

const { Orders } = require("../../model/orders")
const { Product } = require("../../model/products")
const { User } = require("../../model/user")


// const check = async (req, res, next) => {
//     await Orders.exists({ uid: req.session.passport.user.id }).then((userOrders) => {
//         if (!userOrders) {
//             const orders = new Orders({ uid: req.session.passport.user.id})
//             orders.save()
//             next()
//         } else {
//             next()
//         }
//     }).catch((err) => { res.send(err) })
// }

// getting the user wishlist
const getOrders = (req, res, next) => {
  User.findById(req.session.passport.user.id )
    .populate({
      path: 'orders', 
      model: Product,
    })
    .exec()
    .then(orders => {
      // if (!orders) res.send({products:[]})
      // else { res.send(orders) }
      res.send(orders);
    });
};

const orderProduct = async (req, res, next) => {
    const {productId} = req.body
    await User.findById(req.session.passport.user.id).then(async (order) => {

        order.orders.push(productId)
        await order
          .save()
          .then((docs) => {
            res.status(200).send(`Your order has been placed successfully`);
          })
          .catch((err) => {
            res.status(400).send(`Some error occured ${err}`);
          });
      
    });
  };


module.exports = {  getOrders,orderProduct, }
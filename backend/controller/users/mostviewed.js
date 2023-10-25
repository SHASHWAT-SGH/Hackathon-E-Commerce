const { Product } = require("../../model/products");
const { User } = require("../../model/user");

// get a user's product
const mostViewedProducts = async (req, res) => {

    const { productId} = req.body;

    try {
        await User.findById(req.session.passport.user.id)
        .then(async user=>{
            // const count = user.mostViewed
            const existingProductIndex = user.mostViewed.findIndex(product => product.product.equals(productId));
            
            if (existingProductIndex === -1) {
                user.mostViewed.push({ product: productId, count:1 });
            } else {
                user.mostViewed[existingProductIndex].count += 1;
            }
            
            await user.save()
            res.send("ok")
            
            // user.mostViewed.push({ product: productId,count:1 })
            // await user.save().then(result=>res.send(result)).catch(err=>res.send(err))
        })
        .catch(err=>{
            console.log(err);
            res.send("error")
        })

        // if(count===0){
        //     const productIndex = cart.products.findIndex(product => product.product.equals(productId));
        //     cart.products.splice(productIndex, 1);
        //     await cart.save()
        //     .then((result)=>  res.send('Product removed from the cart'))
        //     .catch((err)=>res.send('Product is not the cart'))
        //     return
        // }
        // else if (existingProductIndex === -1) {
        //     cart.products.push({ product: productId, count });
        // } else {
        //     cart.products[existingProductIndex].count = count;
        // }

        // await cart.save();
        // res.send('Product added to the cart');

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// // add a product
// const addProduct = async (req, res, next) => {
//   await User.findById(req.session.passport.user.id).then(async (data) => {
//     if (data.phoneNo) {
//       const product = new Product(req.body);
//       product.date = Date.now();
//       product.postedBy = req.session.passport.user.id;
//       product.isArchive = false
//       await product
//         .save()
//         .then((docs) => {
//           res.status(200).send(`Your product has been added successfully`);
//         })
//         .catch((err) => {
//           res.status(400).send(`Some error occured ${err}`);
//         });
//     } else {
//       res
//         .status(200)
//         .json({ code: "f", message: "Phone number is not verified" });
//     }
//   });
// };

// // archive a product
// const archiveProduct = async (req, res) => {
//   const userId = req.session.passport.user.id;
//   const productId = req.body.productid;
//   await Product.find({ postedBy: userId })
//     .then((docs) => {
//       const UserProduct = docs.find((id) => id._id.equals(productId)); //we're using equals() because the _id is a class so it will give blank value if we use "==="
//       if (UserProduct) {
//         Product.findOneAndUpdate({ _id: productId }, { isArchive: true })
//           .then(() => res.status(200).send("deleted successfully"))
//           .catch((err) => res.send(err));
//       } else {
//         res.send("Item does not exists");
//       }
//     })
//     .catch((err) => {
//       res.status(400).send(`Some error occured <br/> ${err}`);
//     });
// };

// // delete a product
// const deleteProduct = async (req, res) => {
//   const userId = req.session.passport.user.id;
//   const productId = req.body.productid;
//   await Product.find({ postedBy: userId })
//     .then((docs) => {
//       const UserProduct = docs.find((id) => id._id.equals(productId)); //we're using equals() because the _id is a class so it will give blank value if we use "==="
//       if (UserProduct) {
//         Product.findByIdAndDelete(productId)
//           .then(() => res.status(200).send("deleted successfully"))
//           .catch((err) => res.send(err));
//       } else {
//         res.send("Item does not exists");
//       }
//     })
//     .catch((err) => {
//       res.status(400).send(`Some error occured <br/> ${err}`);
//     });
// };

// // delete all the products from the account
// const deleteAllProducts = async (req, res) => {
//   const userId = req.session.passport.user.id;
//   await Product.deleteMany({ postedBy: userId })
//     .then((docs) => {
//       res.send(
//         "All your posted products have been successfully removed from your account"
//       );
//     })
//     .catch((err) => {
//       res.status(400).send(`Some error occured <br/> ${err}`);
//     });
// };

module.exports = {
    mostViewedProducts,
//   addProduct,
//   archiveProduct,
//   deleteProduct,
//   deleteAllProducts,
};

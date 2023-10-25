const { Product } = require("../../model/products");
const { User } = require("../../model/user");

// get a user's product
const mostViewedProducts = async (req, res) => {

    const { productId,route} = req.body;

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
            res.send(route)
            
        })
        .catch(err=>{
            console.log(err);
            res.send("error")
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const mostViewedCategories = async (req, res) => {
    const { productId, route } = req.body;

    try {
        const user = await User.findById(req.session.passport.user.id);
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        
        const category = product.category;

        
        const existingCategory = user.mostViewedCategories.find((item) => item.category === category);

        if (existingCategory) {
            if(route==="cart"){
                existingCategory.count += 3;
            }
            else if(route==="cart"){
                existingCategory.count += 2;
            }else{
                existingCategory.count += 1;
            }
        } else {
            user.mostViewedCategories.push({ category, count: 1 });
        }

        await user.save();
        res.send(route);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    mostViewedProducts,
    mostViewedCategories
};

const { Product } = require("../../model/products");
const { User } = require("../../model/user");


// async function getRecommendedProducts(req, res) {
//   try {
//     // Fetch all products
//     const products = await Product.find();

//     // Fetch all users with mostViewedCategories
//     const users = await User.find({ mostViewedCategories: { $exists: true } });

//     // Create a map to store user ID and mostViewedCategories count
//     const userCategoryCounts = new Map();

//     // Calculate the mostViewedCategory count for each user
//     users.forEach((user) => {
//       const count = user.mostViewedCategories.reduce((acc, category) => acc + category.count, 0);
//       userCategoryCounts.set(user._id, count);
//     });

//     // Sort products based on user mostViewedCategory count
//     products.sort((a, b) => {
//       const categoryCountA = userCategoryCounts.get(a.postedBy);
//       const categoryCountB = userCategoryCounts.get(b.postedBy);
//       return categoryCountB - categoryCountA;
//     });

//     res.json({ products });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

async function getRecommendedProducts(req, res) {
  const userId = req.session.passport.user.id; // Get the user's ID from the request parameters

  try {
    // Fetch the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the user's mostViewedCategories count
    const userMostViewedCategories = user.mostViewedCategories;

    // Fetch all products
    const products = await Product.find();

    // Sort products based on user's mostViewedCategories count
    products.sort((a, b) => {
      const categoryCountA = userMostViewedCategories.find(category => category.category === a.category)?.count || 0;
      const categoryCountB = userMostViewedCategories.find(category => category.category === b.category)?.count || 0;
      return categoryCountB - categoryCountA;
    });

    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}




module.exports = {
    getRecommendedProducts
}
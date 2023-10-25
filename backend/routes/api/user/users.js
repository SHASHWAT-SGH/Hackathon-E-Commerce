const express = require("express");
const {
  getUserInfo,
  signOutUser,
  changeUserName,
  addUserPhone,
} = require("../../../controller/users/users");
const {
  getUserProducts,
  addProduct,
  deleteProduct,
  deleteAllProducts,
  archiveProduct,
} = require("../../../controller/users/userProducts");
const { mostViewedProducts } = require("../../../controller/users/mostviewed");

const UserRoutes = express.Router();

UserRoutes.get("/getUserInfo", getUserInfo)
  .get("/getUserProducts", getUserProducts)
  .post("/addproduct", addProduct)
  .post("/mostViewedProduct", mostViewedProducts)
  .put("/archiveProduct", archiveProduct)
  // .post("/deleteProduct", deleteProduct)
  // .delete("/deleteAllProducts", deleteAllProducts)
  .put("/changeUserName", changeUserName)
  .put("/addUserPhone", addUserPhone)
  .get("/signOutUser", signOutUser);

module.exports = { UserRoutes, signOutUser };

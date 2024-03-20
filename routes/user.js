const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const isAuth = require("../middleware/is-auth");

router.post("/sign-up", UserController.signUp);

router.get("/user-profile", isAuth, UserController.getUser);

router.post("/sign-in", UserController.signIn);

router.post("/create-cart", UserController.createCart);

router.get("/get-cart", isAuth, UserController.getCart);

router.get("/cart", UserController.getCartItems);

router.get("/cart/user", isAuth, UserController.getCartItemsUserMerge);

router.post("/add-to-cart-item", UserController.addToCart);

router.post("/delete-cart-item", UserController.deleteCartItem);

router.post("/create-order", isAuth, UserController.createOrder);

router.get("/orders", isAuth, UserController.getAllOrder);

router.post("/cancel-order", isAuth, UserController.cancelOrder);

router.post("/reset", UserController.getEmail);

router.post("/reset-password", UserController.resetPassword);

router.post("/edit-profile", isAuth, UserController.editProfile);

router.post("/give-review", isAuth, UserController.createReview);

router.get("/get-reviews", UserController.getReviews);

router.get("/get-shipping-methods", UserController.getShippingMethods);

module.exports = router;

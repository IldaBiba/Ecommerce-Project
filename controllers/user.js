const bcrypt = require("bcryptjs");
const crypto = require("crypto");
// const nodemailer = require("nodemailer");
// const sendgridTransport = require("nodemailer-sendgrid-transport");
const DOMAIN = "sandbox2b0741fe23c84536a5f150040e9222a2.mailgun.org";
const api_key = "141124af38311511157d98603cbed75a-b7b36bc2-cab9db86";
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const jwt = require("jsonwebtoken");
const User = require("../models/User/User");
const Response = require("../models/Response");
const Cart = require("../models/Cart/Cart");
const CartItem = require("../models/Cart/Cart-item");
const Order = require("../models/Order/Order");
const OrderItem = require("../models/Order/Order-item");
const Product = require("../models/Product/Product");
const Reviews = require("../models/Review/Review");
const Shipping = require("../models/Shipping/Shipping");

const UserController = {
  signUp: async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(username, email, password, "this is data");

    try {
      if (!username && !email && !password) {
        throw new Error("Enter the needed data");
      }

      const table = "user";
      const field = "email";
      const results = await new User().getOne(table, field, email);

      if (results.length > 0) {
        const obj = {
          response: results,
          success: false,
        };
        res
          .status(200)
          .json(new Response(false, "This user already exists", obj));
      } else {
        const values = {
          username: username,
          email: email,
          password: hashedPassword,
          role: "customer",
        };
        const createdUser = await new User().createOne(table, values);
        const obj = {
          response: createdUser,
          success: true,
        };
        res.status(200).json(new Response(false, "User Created", obj));
      }
    } catch (err) {
      let response = new Response(500, err.message, err);
      res.send(response);
    }
  },

  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const table = "user";
      const field = "email";

      const results = await new User().getOne(table, field, email);

      if (results.length === 0) {
        throw {
          message: "Authentication failure: Invalid email or password",
          success: false,
        };
      }

      const user = results[0];
      const doMatch = await bcrypt.compare(password, user.password);

      if (!doMatch) {
        throw {
          message: " Invalid email or password",
          success: false,
        };
      }

      const token = jwt.sign(
        { email, user_id: user.user_id },
        "somesupersecretsecret",
        {
          expiresIn: "1h",
        }
      );

      const responseData = { token, user, success: true };

      res
        .status(200)
        .json(new Response(false, "user logged in successfully", responseData));
    } catch (err) {
      let response = new Response(err.statusCode || 500, err.message, err);
      res.send(response);
    }
  },

  getUser: async (req, res) => {
    const user_id = req.user_id;

    try {
      const table = "user";
      const field = "user_id";
      const value = user_id;
      const results = await new User().getOne(table, field, value);

      if (results.length > 0) {
        const obj = {
          response: results,
          success: true,
        };
        res.status(200).json(new Response(false, "User is here!", obj));
      } else {
        let response = new Response(true, "User not found.", null);
        res.status(404).json(response);
      }
    } catch (err) {
      let response = new Response(err.statusCode || 500, err.message, err);
      res.send(response);
    }
  },

  createCart: async (req, res) => {
    const table = "cart";
    const values = {
      id_user: null,
    };

    try {
      const results = await new Cart().createOne(table, values);
      const obj = {
        response: results,
        success: true,
      };
      res.status(200).json(new Response(false, "Cart Created", obj));
    } catch (err) {
      let response = new Response(err.statusCode || 500, err.message, err);
      res.send(response);
    }
  },

  addToCart: async (req, res) => {
    const cartId = req.body.cartId;
    const product = req.body.product;
    console.log(product);
    let value;
    let fields;

    console.log(cartId, product, "hey");
    const table = "cartitem";
    const values = {
      quantity: product.quantity,
      cartproduct_id: product.product_id,
      id_cart: cartId,
    };
    if (cartId) {
      fields = ["cartproduct_id", product.product_id];
      value = ["id_cart", cartId];
    }
    try {
      const existingCartItem = await new CartItem().getSingleCartItem(
        table,
        fields,
        value
      );

      if (existingCartItem.length > 0) {
        const updatedValues = {
          quantity: existingCartItem[0].quantity + product.quantity,
        };
        await new CartItem().updateOne(
          table,
          "cartproduct_id",
          updatedValues,
          product.product_id
        );

        console.log("u udate quantity i cart item qe ekzionte");
        const obj = {
          success: true,
        };
        res
          .status(200)
          .json(
            new Response(false, "Cart item quantity updated successfully.", obj)
          );
      } else {
        console.log("u krijua item i ri");
        const results = await new CartItem().createOne(table, values);

        const obj = {
          response: results,
          success: true,
        };
        res
          .status(200)
          .json(new Response(false, "New Cart-Item created.", obj));
      }
    } catch (err) {
      let response = new Response(err.statusCode || 500, err.message, err);
      res.send(response);
    }
  },

  getCartItems: async (req, res) => {
    const cartId = req.query.cartId;
    console.log("po merren cart item pa u loguar");
    try {
      const table = "cart";
      const field = "cart_id";
      const value = cartId;
      console.log(cartId, "cart Id pa loguar");
      const cartResults = await new Cart().getOne(table, field, value);

      if (cartResults.length > 0) {
        const table = "cartitem";
        const field = "id_cart";
        const value = cartResults[0].cart_id;
        const cartItems = await new CartItem().getCartItems(
          table,
          field,
          value
        );
        console.log(cartItems, "hey");

        const obj = {
          response: cartItems,
          success: true,
        };
        res.status(200).json(new Response(false, "Cart items are here!", obj));
      } else {
        const obj = {
          response: cartResults,
          success: true,
        };
        res.status(200).json(new Response(false, "Cart is here!", obj));
      }
    } catch (err) {
      let response = new Response(err.statusCode || 500, err.message, err);
      res.send(response);
    }
  },

  getCartItemsUserMerge: async (req, res) => {
    try {
      const { user_id } = req;
      const cartId = req.query.cartId;

      const cartResults = await new Cart().getOne("cart", "id_user", user_id);
      console.log(cartResults);

      if (cartResults.length > 0) {
        const existingCartId = cartResults[0].cart_id;

        const newCartItems = await new CartItem().getCartItems(
          "cartitem",
          "id_cart",
          cartId
        );

        for (let newItem of newCartItems) {
          const existingItems = await new CartItem().getCartItems(
            "cartitem",
            "id_cart",
            existingCartId
          );
          const existingItem = existingItems.find(
            (item) => item.cartproduct_id === newItem.cartproduct_id
          );

          if (existingItem) {
            const updatedQuantity = existingItem.quantity + newItem.quantity;
            await new CartItem().updateCartItem(
              "cartitem",
              "quantity",
              updatedQuantity,
              "id_cart",
              existingCartId,
              "cartproduct_id",
              newItem.cartproduct_id
            );
          } else {
            await new CartItem().createOne("cartitem", {
              quantity: newItem.quantity,
              cartproduct_id: newItem.cartproduct_id,
              id_cart: existingCartId,
            });
          }
        }

        await new Cart().deleteOne("cart", "cart_id", cartId);
        const existingCartItems = await new CartItem().getCartItems(
          "cartitem",
          "id_cart",
          existingCartId
        );

        const cartResponse = {
          response: existingCartItems,
          success: true,
        };
        res
          .status(200)
          .json(
            new Response(false, "Cart items merged successfully!", cartResponse)
          );
      } else {
        const newCartValue = user_id;
        const newCartTable = "cart";
        const newCartField = "cart_id";

        await new Cart().updateCart(
          newCartTable,
          cartId,
          newCartValue,
          newCartField
        );
        const newCartResults = await new Cart().getOne(
          newCartTable,
          newCartField,
          cartId
        );

        const cartResponse = {
          response: newCartResults,
          success: true,
        };
        res
          .status(200)
          .json(new Response(false, "Cart is here!", cartResponse));
      }
    } catch (error) {
      let response = new Response(500, error.message, error);
      res.send(response);
    }
  },

  getCart: async (req, res) => {
    const user_id = req.user_id;
    const cartValue = req.query.cartId;

    try {
      const cartResults = await new Cart().getOne("cart", "id_user", user_id);

      if (cartResults.length > 0) {
        const cartResponse = {
          response: cartResults,
          success: true,
        };
        res
          .status(200)
          .json(new Response(false, "Cart is here!", cartResponse));
      } else {
        const newCartValue = user_id;
        const table = "cart";
        const value = user_id;

        await new Cart().updateCart(table, cartValue, newCartValue);
        const newCartResults = await new Cart().getOne(
          table,
          "id_user",
          user_id
        );
        const cartResponse = {
          response: newCartResults,
          success: true,
        };
        res
          .status(200)
          .json(new Response(false, "Cart is here!", cartResponse));
      }
    } catch (err) {
      let response = new Response(err.statusCode || 500, err.message, err);
      res.send(response);
    }
  },

  deleteCartItem: async (req, res) => {
    try {
      const cartItemId = req.body.cartItemId;
      console.log(cartItemId);
      const table = "cartitem";
      const field = "cartitem_id";
      const value = cartItemId;

      const response = await new CartItem().deleteCartItem(table, value, field);

      const obj = {
        success: true,
        results: response,
      };

      res.status(200).json(new Response(false, "Cart Item deleted!", obj));
    } catch (error) {
      console.error("Error deleting cart item:", error);
      res.status(500).json(new Response(true, "Failed to delete cart item"));
    }
  },

  createOrder: async (req, res) => {
    console.log("Creating order...");
    try {
      const { user_id } = req;
      const { city, phoneNumber, address, paymentMethod, shippingMethod } =
        req.body;

      const userCart = await new Cart().getOne("cart", "id_user", user_id);
      if (!userCart.length) {
        const response = { success: false };
        return res
          .status(200)
          .json(
            new Response(
              true,
              "You need to have products in your cart!",
              response
            )
          );
      }

      const cartItems = await new CartItem().getCartItems(
        "cartitem",
        "id_cart",
        userCart[0].cart_id
      );
      console.log("Cart items:", cartItems);

      for (const cartItem of cartItems) {
        const product = await new Product().getOne(
          "product",
          "product_id",
          cartItem.cartproduct_id
        );
        console.log(product);
        if (product[0].stock < cartItem.quantity) {
          console.log("nuk ka stok");
          const response = { success: false };
          return res
            .status(200)
            .json(
              new Response(
                true,
                `Insufficient stock for product ${product.title}`,
                response
              )
            );
        }
      }

      const newOrder = await new Order().createOrder("order", {
        id_order_user: user_id,
        order_status: 1,
        city: city,
        phone_number: phoneNumber,
        address: address,
        payment_method: paymentMethod,
        shipping_method: shippingMethod,
      });

      for (const cartItem of cartItems) {
        const product = await new Product().getOne(
          "product",
          "product_id",
          cartItem.cartproduct_id
        );
        const orderItemData = {
          id_order: newOrder.insertId,
          orderproduct_id: cartItem.cartproduct_id,
          quantity: cartItem.quantity,
          price_order: product[0].price,
        };
        await new OrderItem().createOne("orderitem", orderItemData);

        await new Product().decreaseStock(
          cartItem.cartproduct_id,
          cartItem.quantity
        );
      }

      await new CartItem().deleteOne(
        "cartitem",
        "id_cart",
        userCart[0].cart_id
      );
      await new Cart().deleteOne("cart", "cart_id", userCart[0].cart_id);

      const response = { success: true };
      res
        .status(200)
        .json(new Response(false, "Order created successfully", response));
    } catch (error) {
      console.error("Error creating order:", error);
      res
        .status(error.statusCode || 500)
        .json({ error: error.message || "Internal server error" });
    }
  },

  getAllOrder: async (req, res) => {
    try {
      const { user_id } = req;
      const orders = await new Order().getAllOrders(user_id);
      const response = {
        success: true,
        response: orders,
      };
      res
        .status(200)
        .json(new Response(false, "Order created successfully", response));
    } catch (error) {
      console.error("Error fetching all orders:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  },

  getEmail: async (req, res) => {
    const { email } = req.body;
    console.log(email);
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      const token = buffer.toString("hex");
      const table = "user";
      const field = "email";
      const value = email;
      const results = await new User().getOne(table, field, value);
      console.log(results);

      if (results.length > 0) {
        const table = "user";
        const value = email;
        const column = "email";
        const fields = {
          reset_token: token,
          reset_token_expiration: new Date(Date.now() + 3600000),
        };
        const response = await new User().updateUser(
          table,
          column,
          fields,
          value
        );
        const mg = mailgun.client({ username: "api", key: api_key });
        let HtmlLink = `<a href="http://localhost:3000/reset-password?q=${token}">link</a>`;
        const data = {
          from: "ecommerce@sandbox2b0741fe23c84536a5f150040e9222a2.mailgun.org",
          to: email,
          subject: "Password reset",
          html: `<p>You requested a password reset</p>
                 <p>Click this ${HtmlLink} to set a new password</p>
                `,
        };
        mg.messages
          .create(DOMAIN, data)
          .then((msg) => {
            console.log(msg);
            return res
              .status(200)
              .json({ message: "Email sent successfully", response: response });
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: "Failed to send email" });
          });
      } else {
        let response = new Response(
          true,
          "No account with that email found.",
          null
        );
        res.status(404).json(response);
      }
    });
  },

  resetPassword: async (req, res) => {
    const { np } = req.query;
    const { newPassword } = req.body;

    try {
      const table = "user";
      const field = "reset_token";
      const results = await new User().getOne(table, field, np);

      console.log(results);
      if (results.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Invalid or expired reset token" });
      }

      const currentTime = new Date();
      const tokenExpiration = results[0].reset_token_expiration;
      console.log(tokenExpiration);
      if (tokenExpiration < currentTime) {
        return res
          .status(403)
          .json({ success: false, message: "Reset token has expired" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);

      const userId = results[0].user_id;
      const updateValues = {
        password: hashedPassword,
        reset_token: null,
        reset_token_expiration: null,
      };
      await new User().updateOne(table, "user_id", updateValues, userId);

      return res
        .status(200)
        .json({ success: true, message: "Password reset successfully" });
    } catch (err) {
      console.error("Error resetting password:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  cancelOrder: async (req, res) => {
    const { statusValue, orderId } = req.body;
    try {
      const table = "status";
      const field = "name";
      const results = await new User().getOne(table, field, statusValue);

      console.log(results);
      if (results.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Invalid or expired reset token" });
      }

      const updateValues = {
        order_status: results[0].status_id,
      };

      const response = await new Order().updateOrder(
        "order",
        "order_id",
        updateValues,
        orderId
      );

      return res
        .status(200)
        .json({ success: true, message: "Order status updated successfully" });
    } catch (err) {
      console.error("Error updating order status:", err);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  createReview: async (req, res) => {
    const userId = req.user_id;
    const productId = req.query.productId;
    const review = req.body.review;
    const starRating = req.body.rating;

    try {
      const table = "review";
      const values = {
        description: review,
        id_user_review: userId,
        id_product_review: productId,
        rating_star: starRating,
      };

      const createdReview = await new Reviews().createOne(table, values);
      const obj = {
        response: createdReview,
        success: true,
      };
      res
        .status(200)
        .json(
          new Response(
            false,
            "Thank you for giving a review on our product!",
            obj
          )
        );
    } catch (err) {
      let response = new Response(err.statusCode || 500, err.message, err);
      res.send(response);
    }
  },

  getReviews: async (req, res) => {
    const productId = req.query.productId;
    console.log("id e produktit", productId);
    try {
      const reviews = await new Reviews().getReviewsByProductId(productId);
      const obj = {
        response: reviews,
        succes: true,
      };
      return res
        .status(200)
        .json(new Response(false, "Reviews retrieved successfully", obj));
    } catch (err) {
      let response = new Response(err.statusCode || 500, err.message, err);
      return res.send(response);
    }
  },

  // editProfile: async (req, res) => {
  //   const userId = req.user_id;
  //   const { username, email, currentPassword, newPassword } = req.body;

  //   try {
  //     const user = await new User().getOne("user", "user_id", userId);

  //     if (!user || !user.length) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "User not found",
  //       });
  //     }

  //     const isPasswordMatch = await bcrypt.compare(
  //       currentPassword,
  //       user[0].password
  //     );

  //     if (!isPasswordMatch) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Current password is incorrect",
  //       });
  //     }

  //     let hashedPassword = null;
  //     if (newPassword) {
  //       hashedPassword = await bcrypt.hash(newPassword, 10);
  //     }

  //     const fieldsToUpdate = {};
  //     if (username) fieldsToUpdate.username = username;
  //     if (email) fieldsToUpdate.email = email;
  //     if (hashedPassword) fieldsToUpdate.password = hashedPassword;

  //     const updatedUser = await new User().updateOne(
  //       "user",
  //       "user_id",
  //       fieldsToUpdate,
  //       userId
  //     );

  //     return res.status(200).json({
  //       success: true,
  //       message: "User profile updated successfully",
  //       response: updatedUser,
  //     });
  //   } catch (err) {
  //     return res.status(err.statusCode || 500).json({
  //       success: false,
  //       message: err.message,
  //       error: err,
  //     });
  //   }
  // },

  editProfile: async (req, res) => {
    const userId = req.user_id;
    const { username, email, currentPassword, newPassword } = req.body;

    try {
      const user = await new User().getOne("user", "user_id", userId);

      if (!user || !user.length) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        user[0].password
      );

      if (!isPasswordMatch) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      const fieldsToUpdate = {};
      if (username) fieldsToUpdate.username = username;
      if (email) fieldsToUpdate.email = email;

      // Check if newPassword exists and hash it
      if (newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        fieldsToUpdate.password = hashedPassword;
      }

      const updatedUser = await new User().updateOne(
        "user",
        "user_id",
        fieldsToUpdate,
        userId
      );

      return res.status(200).json({
        success: true,
        message: "User profile updated successfully",
        response: updatedUser,
      });
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
        error: err,
      });
    }
  },

  getShippingMethods: async (req, res) => {
    try {
      const table = "shipping";
      const shipping = await new Shipping().getAll(table);
      console.log("shipping methods", shipping);
      const obj = {
        response: shipping,
        succes: true,
      };
      return res
        .status(200)
        .json(
          new Response(false, "Shipping methods retrieved successfully!", obj)
        );
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
        error: err,
      });
    }
  },
};
module.exports = UserController;

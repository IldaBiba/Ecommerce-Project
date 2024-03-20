const Category = require("../models/Category/Category");
const Product = require("../models/Product/Product");
const Response = require("../models/Response");
const Image = require("../models/Product/Image");
const fs = require("fs");
const path = require("path");
const Order = require("../models/Order/Order");
const User = require("../models/User/User");
const { query } = require("express");

const AdminControllers = {
  // createCategory: async (req, res) => {
  //   const { name, description } = req.body;
  //   const categoryid = req.query.categoryid;
  //   console.log(categoryid, "here");
  //   console.log(name, description);
  //   if (categoryid) {
  //     if (!name && !description) {
  //       throw new Error("Enter the needed data");
  //     }
  //     const table = "category";
  //     const value = categoryid;
  //     const fields = {
  //       name: name,
  //       description: description,
  //     };
  //     const column = "category_id";
  //     new Category().updateOne(table, column, fields, value, (err, results) => {
  //       if (err) {
  //         let response = new Response(true, err.message, err);
  //         res.send(response);
  //       } else {
  //         const obj = {
  //           response: results,
  //           success: true,
  //         };
  //         res.status(200).json(new Response(false, "Category Updated", obj));
  //       }
  //     });
  //   } else {
  //     try {
  //       if (!name && !description) {
  //         throw new Error("Enter the needed data");
  //       }
  //       const table = "category";
  //       const field = "name";
  //       const value = name;
  //       await new Category().getOne(table, field, value, (err, results) => {
  //         if (err) {
  //           let response = new Response(true, err.message, err);
  //           res.send(response);
  //         } else {
  //           console.log(results);
  //           if (results.length > 0) {
  //             console.log(results);
  //             const obj = {
  //               response: results,
  //               success: false,
  //             };
  //             res
  //               .status(200)
  //               .json(new Response(false, "This category already exists", obj));
  //           } else {
  //             const values = {
  //               name: name,
  //               description: description,
  //             };
  //             new Category().createOne(table, values, (err, results) => {
  //               if (err) {
  //                 let response = new Response(true, err.message, err);
  //                 res.send(response);
  //               } else {
  //                 const obj = {
  //                   response: results,
  //                   success: true,
  //                 };
  //                 res
  //                   .status(200)
  //                   .json(new Response(false, "Category Created", obj));
  //               }
  //             });
  //           }
  //         }
  //       });
  //     } catch (err) {
  //       let response = new Response(500, err.message, err);
  //       res.send(response);
  //     }
  //   }
  // },

  // getAllCategories: async (req, res) => {
  //   const table = "category";
  //   await new Category().getAll(table, (err, results) => {
  //     if (err) {
  //       let response = new Response(true, err.message, err);
  //       res.send(response);
  //     } else {
  //       console.log(results);
  //       const obj = {
  //         response: results,
  //         success: true,
  //       };
  //       res
  //         .status(200)
  //         .json(new Response(false, "All categories are here", obj));
  //     }
  //   });
  // },

  // createProduct: async (req, res) => {
  //   const { title, description, category, price } = req.body;
  //   console.log(title, description, category, price);
  //   console.log(req.files);
  //   const productid = req.query.productid;
  //   if (productid) {
  //     if (!req.files) {
  //       return res.status(400).json({ error: "No image provided." });
  //     }

  //     const table = "product";
  //     const value = productid;
  //     const fields = {
  //       title: title,
  //       description: description,
  //       price: price,
  //       id_category: category,
  //     };
  //     const column = "product_id";

  //     await new Product().updateOne(
  //       table,
  //       column,
  //       fields,
  //       value,
  //       (err, results) => {
  //         if (err) {
  //           let response = new Response(true, err.message, err);
  //           res.send(response);
  //         }

  //         let imagePath;
  //         for (let i = 0; i < req.files.length; i++) {
  //           imagePath = req.files[i].path;
  //           const imageValues = {
  //             path: imagePath,
  //             id_product_image: productid,
  //           };
  //           new Image().createOnePromise("image", imageValues);
  //         }

  //         res
  //           .status(200)
  //           .json(new Response(false, "Product updated successfully"));
  //       }
  //     );
  //   } else {
  //     try {
  //       // Check if req.file exists (uploaded image)
  //       if (!req.files) {
  //         return res.status(400).json({ error: "No image provided." });
  //       }

  //       const values = {
  //         title: title,
  //         description: description,
  //         price: price,
  //         id_category: category,
  //       };

  //       const productResults = await new Product().createOnePromise(
  //         "product",
  //         values
  //       );

  //       let imagePath;
  //       for (let i = 0; i < req.files.length; i++) {
  //         imagePath = req.files[i].path;
  //         const imageValues = {
  //           path: imagePath,
  //           id_product_image: productResults.insertId,
  //         };
  //         await new Image().createOnePromise("image", imageValues);
  //       }

  //       const responseObj = {
  //         response: productResults,
  //         success: true,
  //       };

  //       res
  //         .status(200)
  //         .json(
  //           new Response(false, "Product created successfully", responseObj)
  //         );
  //     } catch (err) {
  //       let response = new Response(500, err.message, err);
  //       res.send(response);
  //     }
  //   }
  // },

  // getAllProducts: async (req, res) => {
  //   try {
  //     const table = "product";
  //     await new Product().getAllProducts(table, (err, results) => {
  //       if (err) {
  //         let response = new Response(true, err.message, err);
  //         res.send(response);
  //       } else {
  //         const obj = {
  //           response: results,
  //           success: true,
  //         };
  //         res
  //           .status(200)
  //           .json(new Response(false, "All products are here", obj));
  //       }
  //     });
  //   } catch (err) {
  //     let response = new Response(500, err.message, err);
  //     res.send(response);
  //   }
  // },

  // deleteProduct: async (req, res) => {
  //   const product_id = req.body.product_id;
  //   try {
  //     const table = "product";

  //     const field = "product_id";

  //     const value = product_id;

  //     await new Product().deleteOne(table, field, value, (err, results) => {
  //       if (err) {
  //         let response = new Response(true, err.message, err);
  //         res.send(response);
  //       } else {
  //         console.log(results);
  //         const obj = {
  //           response: results,
  //           success: true,
  //         };
  //         res
  //           .status(200)
  //           .json(new Response(false, "Product deleted successfully!", obj));
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     let response = new Response(500, err.message, err);
  //     res.send(response);
  //   }
  // },

  // getSingleCategory: async (req, res) => {
  //   console.log(req.query.categoryid);
  //   const table = "category";
  //   const field = "category_id";
  //   const value = req.query.categoryid;
  //   try {
  //     await new Category().getOne(table, field, value, (err, results) => {
  //       if (err) {
  //         let response = new Response(true, err.message, err);
  //         res.send(response);
  //       } else {
  //         console.log(results);
  //         if (results.length > 0) {
  //           console.log(results);
  //           const obj = {
  //             response: results,
  //             success: false,
  //           };
  //           res.status(200).json(new Response(false, "Category is here!", obj));
  //         }
  //       }
  //     });
  //   } catch (err) {
  //     let response = new Response(500, err.message, err);
  //     res.send(response);
  //   }
  // },

  // getSingleProduct: async (req, res) => {
  //   console.log(req.query.productid);
  //   const table = "product";
  //   const field = "product_id";
  //   const value = req.query.productid;
  //   try {
  //     await new Product().getOne(table, field, value, (err, results) => {
  //       if (err) {
  //         let response = new Response(true, err.message, err);
  //         res.send(response);
  //       } else {
  //         console.log(results);
  //         if (results.length > 0) {
  //           console.log(results);
  //           const obj = {
  //             response: results,
  //             success: false,
  //           };
  //           res.status(200).json(new Response(false, "Product is here!", obj));
  //         }
  //       }
  //     });
  //   } catch (err) {
  //     let response = new Response(500, err.message, err);
  //     res.send(response);
  //   }
  // },

  createCategory: async (req, res) => {
    const { name, description } = req.body;
    const categoryid = req.query.categoryid;
    console.log(categoryid, "here");
    console.log(name, description);
    try {
      if (categoryid) {
        if (!name && !description) {
          throw new Error("Enter the needed data");
        }
        const table = "category";
        const value = categoryid;
        const fields = {
          name: name,
          description: description,
        };
        const column = "category_id";
        const results = await new Category().updateOne(
          table,
          column,
          fields,
          value
        );
        const obj = {
          response: results,
          success: true,
        };
        res.status(200).json(new Response(false, "Category Updated", obj));
      } else {
        if (!name && !description) {
          throw new Error("Enter the needed data");
        }
        const table = "category";
        const field = "name";
        const value = name;
        const results = await new Category().getOne(table, field, value);
        console.log(results);
        if (results.length > 0) {
          console.log(results);
          const obj = {
            response: results,
            success: false,
          };
          res
            .status(200)
            .json(new Response(false, "This category already exists", obj));
        } else {
          const values = {
            name: name,
            description: description,
          };
          await new Category().createOne(table, values);
          const obj = {
            response: results,
            success: true,
          };
          res.status(200).json(new Response(false, "Category Created", obj));
        }
      }
    } catch (err) {
      let response = new Response(500, err.message, err);
      res.send(response);
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const table = "category";
      const results = await new Category().getAll(table);
      console.log(results);
      const obj = {
        response: results,
        success: true,
      };
      res.status(200).json(new Response(false, "All categories are here", obj));
    } catch (err) {
      let response = new Response(500, err.message, err);
      res.send(response);
    }
  },

  createProduct: async (req, res) => {
    const { title, description, category, price, stock } = req.body;
    console.log(title, description, category, price, stock);
    console.log(req.files);
    const productid = req.query.productId;
    console.log(req.files.length);
    try {
      if (productid) {
        if (!req.files || req.files.length == 0) {
          return res.status(200).json({ error: "No image provided." });
        }
        const table = "product";
        const value = productid;
        const fields = {
          title: title,
          description: description,
          price: price,
          id_category: category,
          stock: stock,
        };
        const column = "product_id";
        await new Product().updateOne(table, column, fields, value);
        let imagePath;
        for (let i = 0; i < req.files.length; i++) {
          imagePath = req.files[i].path;
          const imageValues = {
            path: imagePath,
            id_product_image: productid,
          };
          await new Image().createOne("image", imageValues);
        }
        const response = {
          success: true,
        };
        res
          .status(200)
          .json(new Response(false, "Product updated successfully", response));
      } else {
        if (!req.files) {
          return res.status(400).json({ error: "No image provided." });
        }
        const values = {
          title: title,
          description: description,
          price: price,
          id_category: category,
          stock: stock,
        };
        const productResults = await new Product().createOne("product", values);
        let imagePath;
        for (let i = 0; i < req.files.length; i++) {
          imagePath = req.files[i].path;
          const imageValues = {
            path: imagePath,
            id_product_image: productResults.insertId,
          };
          await new Image().createOne("image", imageValues);
        }
        const responseObj = {
          response: productResults,
          success: true,
        };
        res
          .status(200)
          .json(
            new Response(false, "Product created successfully", responseObj)
          );
      }
    } catch (err) {
      let response = new Response(500, err.message, err);
      res.send(response);
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const { currentPage, recordsPerPage, search } = req.query;
      console.log(search);
      const table = "product";
      let results, totalCount;

      if (search !== "null" && search !== undefined && search.trim() !== "") {
        const searchResults = await new Product().getProductsBySearch(
          table,
          search,
          currentPage,
          recordsPerPage
        );
        results = searchResults.results;
        totalCount = searchResults.totalCount;
      } else {
        const allResults = await new Product().getAllProducts(
          table,
          currentPage,
          recordsPerPage
        );
        results = allResults.results;
        totalCount = allResults.totalCount;
      }

      const totalPages = Math.ceil(totalCount / recordsPerPage);
      const obj = {
        totalPages: totalPages,
        response: results,
        success: true,
      };
      res
        .status(200)
        .json(new Response(false, "Products retrieved successfully", obj));
    } catch (err) {
      let response = new Response(500, err.message, err);
      res.status(500).json(response);
    }
  },

  deleteProduct: async (req, res) => {
    const product_id = req.body.product_id;
    console.log("hey", product_id);

    try {
      const product = await new Product().getOneProduct(
        "product",
        "product_id",
        product_id
      );

      if (product.length > 0) {
        console.log(product);

        const imagePaths = product[0].images;
        console.log(imagePaths);

        imagePaths.forEach((imagePath) => {
          const fullPath = path.join(__dirname, "..", imagePath.path);
          fs.unlinkSync(fullPath);
        });

        await new Product().deleteOneProduct(
          "product",
          "product_id",
          product_id
        );

        const response = {
          response: product,
          success: true,
        };
        res.status(200).json({
          message: "Product found, images deleted, and product deleted!",
          response,
        });
      } else {
        res.status(404).json({ message: "Product not found!" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getSingleCategory: async (req, res) => {
    console.log(req.query.categoryid);
    try {
      const table = "category";
      const field = "category_id";
      const value = req.query.categoryid;
      const results = await new Category().getOne(table, field, value);
      console.log(results);
      if (results.length > 0) {
        console.log(results);
        const obj = {
          response: results,
          success: false,
        };
        res.status(200).json(new Response(false, "Category is here!", obj));
      }
    } catch (err) {
      let response = new Response(500, err.message, err);
      res.send(response);
    }
  },

  getSingleProduct: async (req, res) => {
    try {
      const productId = req.query.productId;
      const table = "product";
      const field = "product_id";
      const value = productId;

      const productResults = await new Product().getOneProduct(
        table,
        field,
        value
      );

      const averageRating = await new Product().getAverageRating(productId);

      if (productResults.length > 0) {
        const obj = {
          response: productResults,
          averageRating: averageRating,
          success: true,
        };
        res.status(200).json(new Response(false, "Product is here!", obj));
      }
    } catch (err) {
      let response = new Response(500, err.message, err);
      res.send(response);
    }
  },

  deleteSingleProductImage: async (req, res) => {
    const image_id = req.body.image_id;

    try {
      const results = await new Image().deleteOne(
        "image",
        "image_id",
        image_id
      );

      const obj = {
        response: results,
        success: true,
      };
      res
        .status(200)
        .json(new Response(false, "Image deleted successfully", obj));
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getProductsByCategory: async (req, res) => {
    try {
      const table = "product";
      const field = "id_category";
      const value = req.query.categoryid;
      const { currentPage, recordsPerPage } = req.query;

      const results = await new Product().getAllProductsByCategory(
        table,
        field,
        value,
        currentPage,
        recordsPerPage
      );
      console.log(results);

      if (results.results.length > 0) {
        const obj = {
          response: results,
          success: true,
        };
        res
          .status(200)
          .json(new Response(false, "Products of the category are here!", obj));
      } else {
        const obj = {
          success: false,
        };
        res
          .status(200)
          .json(
            new Response(false, "No products was found for this category!", obj)
          );
      }
    } catch (err) {
      let response = new Response(500, err.message, err);
      res.send(response);
    }
  },

  getRelatedProduct: async (req, res) => {
    try {
      const value = req.query.categoryid;

      const products = await new Product().getRelatedProduct(
        "product",
        "category_id",
        value
      );

      const obj = {
        response: products,
        success: true,
      };
      res
        .status(200)
        .json(new Response(false, "Products of the category are here!", obj));
    } catch (err) {
      let response = new Response(500, err.message, err);
      res.send(response);
    }
  },

  deleteCategory: async (req, res) => {
    const category_id = req.body.category_id;
    console.log(category_id);

    try {
      const results = await new Category().deleteOne(
        "category",
        "category_id",
        category_id
      );

      const obj = {
        response: results,
        success: true,
      };
      res
        .status(200)
        .json(new Response(false, "Category deleted successfully", obj));
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await new Order().getAllOrdersAdmin();
      const obj = {
        success: true,
        response: orders,
      };

      res
        .status(200)
        .json(new Response(false, "All the orders are here!", obj));
    } catch (error) {
      console.error("Error fetching all orders:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  },

  getOrderProducts: async (req, res) => {
    const orderId = req.query.orderId;
    console.log(orderId);
    try {
      const order = await new Order().getOrderById(orderId);

      const obj = {
        success: true,
        response: order,
      };

      res
        .status(200)
        .json(new Response(false, "The order with its products is here!", obj));
    } catch (error) {
      console.error("Error fetching all orders:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  },

  getAllCustomers: async (req, res) => {
    try {
      const customers = await new User().getAllUser(
        "user",
        'role = "customer"'
      );
      const obj = {
        success: true,
        response: customers,
      };

      res
        .status(200)
        .json(new Response(false, "All the custromers are here!", obj));
    } catch (error) {
      console.error("Error fetching all orders:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  },

  getAllOrderStatus: async (req, res) => {
    try {
      const table = "status";
      const results = await new Product().getAll(table);
      const obj = {
        response: results,
        success: true,
      };
      res
        .status(200)
        .json(new Response(false, "All order statuses are here", obj));
    } catch (err) {
      let response = new Response(500, err.message, err);
      res.send(response);
    }
  },

  editOrderStatus: async (req, res) => {
    try {
      const { order_id, status_id } = req.body;
      const table = "order";
      const column = "order_id";
      const fieldName = "order_status";

      await new Order().updateStatus(
        table,
        column,
        fieldName,
        status_id,
        order_id
      );
      console.log("hi");
      res
        .status(200)
        .json({ success: true, message: "Order status updated successfully" });
    } catch (err) {
      console.error("Error updating order status:", err);
      res
        .status(500)
        .json({ success: false, message: "Failed to update order status" });
    }
  },

  getDashboard: async (req, res) => {
    try {
      const orders = await new Order().getAllOrdersAdmin();

      let totalOrders = 0;
      let totalRevenue = 0;
      let customers = 0;

      for (const order of orders) {
        totalOrders++;

        const orderItems = await new Order().getOrderItemsByOrderId(
          order.order_id
        );

        let orderRevenue = 0;
        for (const item of orderItems) {
          orderRevenue += item.price * item.quantity;
        }

        totalRevenue += orderRevenue;
      }

      const users = await new User().getAll("user");

      customers = users.length;

      const latestSales = await new Order().getAllOrdersAdmin();

      const topProducts = await new Product().getTopSelling();
      console.log("total Orders", totalOrders);
      console.log("total Revenue", totalRevenue);
      console.log("customers", customers);
      console.log("latestSales", latestSales);
      console.log("topProducts", topProducts);

      res.status(200).json({
        totalOrders,
        totalRevenue,
        customers,
        latestSales,
        topProducts,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
module.exports = AdminControllers;

const express = require("express");
const router = express.Router();

const AdminControllers = require("../controllers/admin");

const isAuth = require("../middleware/is-auth");
const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

router.post(
  "/create-product",
  [isAuth, upload.array("images", 12)],
  AdminControllers.createProduct
);

router.get("/products", AdminControllers.getAllProducts);

router.get("/products/related", AdminControllers.getRelatedProduct);

router.get("/products/category", AdminControllers.getProductsByCategory);

router.get("/single-product", AdminControllers.getSingleProduct);

router.post("/delete-product", isAuth, AdminControllers.deleteProduct);

router.post(
  "/delete-image-product",
  isAuth,
  AdminControllers.deleteSingleProductImage
);

router.post("/create-category", isAuth, AdminControllers.createCategory);

router.get("/categories", AdminControllers.getAllCategories);

router.get("/single-category", isAuth, AdminControllers.getSingleCategory);

router.post("/delete-category", isAuth, AdminControllers.deleteCategory);

router.get("/orders", isAuth, AdminControllers.getAllOrders);

router.get("/order-products", isAuth, AdminControllers.getOrderProducts);

router.get("/customers", isAuth, AdminControllers.getAllCustomers);

router.get("/order-status", isAuth, AdminControllers.getAllOrderStatus);

router.post("/edit-order-status", isAuth, AdminControllers.editOrderStatus);

router.get("/get-dashboard", isAuth, AdminControllers.getDashboard);

module.exports = router;

import { configureStore } from "@reduxjs/toolkit";
import { signUp } from "../views/account/auth/SignUp/SignUp.reducers";
import { signIn } from "../views/account/auth/SignIn/SignIn.reducers";
import { createCategory } from "../views/account/admin/CreateCategory/CreateCategory.reducers";
import { createProduct } from "../views/account/admin/CreateProduct/CreateProduct.reducers";
import { allProducts } from "../views/product/Products/GetProducts.reducers";
import { singleProduct } from "../views/product/SingleProduct/SingleProduct.reducers";
import { banner } from "../views/product/Banner/Banner.reducers";
import { order } from "../views/account/user/Orders/Orders.reducers";
import { orderAdmin } from "../views/account/admin/Orders/Orders.reducers";
import { customer } from "../views/account/admin/Customers/Customers.reducers";
import { allCategories } from "../views/categories/GetCategories.reducers";
import { orderProductsAdmin } from "../views/account/admin/OrderProducts/OrderProducts.reducers";
import { allCategoryProducts } from "../views/product/CategoryProducts/CategoryProducts.reducers";
import { review } from "../views/review/Review.reducers";
import { user } from "../views/account/user/User/GetUser.reducers";

const store = configureStore({
  reducer: {
    signUp: signUp,
    signIn: signIn,
    user: user,
    createCategory: createCategory,
    createProduct: createProduct,
    allProducts: allProducts,
    allCategories: allCategories,
    orderAdmin: orderAdmin,
    singleProduct: singleProduct,
    banner: banner,
    orders: order,
    adminOrders: orderAdmin,
    customer: customer,
    orderProductsAdmin: orderProductsAdmin,
    categoryProducts: allCategoryProducts,
    review: review,
  },
});

export default store;

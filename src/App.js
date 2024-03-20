import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import SignIn from "./views/account/auth/SignIn/SignIn";
import SignUp from "./views/account/auth/SignUp/SignUp";
import UserProfile from "./views/account/user/User/UserProfile";
import Cart from "./views/cart/Cart";
import Checkout from "./views/checkout/Checkout";
import CreateProduct from "./views/account/admin/CreateProduct/CreateProduct";
import CreateCategory from "./views/account/admin/CreateCategory/CreateCategory";
import Layout from "./Layout/Layout";
import AdminLayout from "./Layout/AdminLayout";
import NotFoundView from "./views/pages/404";
import InternalServerErrorView from "./views/pages/500";
import Products from "./views/product/Products/Products";
import { useSelector } from "react-redux";
import { CartProvider } from "./Context/CartContext";
import Categories from "./views/categories/Categories";
import SingleProduct from "./views/product/SingleProduct/SingleProduct";
import { ToastContainer } from "react-toastify";

import AdminOrders from "./views/account/admin/Orders/Orders";
import Customers from "./views/account/admin/Customers/Customers";
import Reset from "./views/account/auth/Reset/Reset";
import ResetPassword from "./views/account/auth/ResetPassword/ResetPassword";
import OrderProducts from "./views/account/admin/OrderProducts/OrderProducts";
import CategoryProducts from "./views/product/CategoryProducts/CategoryProducts";
import EditProfileForm from "./components/Forms/EditProfileForm";
import Dashboard from "./views/account/admin/Dashboard/Dashboard";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const signIn = useSelector((state) => state.signIn.isSignedIn);
  const size = 4;
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/check-out" element={<Checkout />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/edit-profile" element={<EditProfileForm />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/:userId/:cartId" element={<Home />} /> */}
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/single-product/:productId"
              element={<SingleProduct />}
            />
            <Route
              path="/category/:categoryId"
              element={<CategoryProducts />}
            />
          </Route>
          {(token && role === "admin") || signIn ? (
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route
                path="/admin/products"
                element={<Products size={size} />}
              />
              <Route
                path="/admin/category/:categoryId"
                element={<CategoryProducts />}
              />
              <Route
                path="/admin/single-product/:productId"
                element={<SingleProduct />}
              />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route
                path="/admin/orders/:orderId"
                element={<OrderProducts />}
              />
              <Route path="/admin/customers" element={<Customers />} />

              <Route path="/admin/categories" element={<Categories />} />
              <Route path="/admin/create-product" element={<CreateProduct />} />
              <Route
                path="/admin/create-product/:productid"
                element={<CreateProduct />}
              />
              <Route
                path="/admin/create-category"
                element={<CreateCategory />}
              />
              <Route
                path="/admin/create-category/:categoryid"
                element={<CreateCategory />}
              />
            </Route>
          ) : null}
          <Route path="/error" element={<InternalServerErrorView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
        <ToastContainer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;

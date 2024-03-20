import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useCart } from "../Context/CartContext";
import useGetCart from "../views/cart/UseGetCart";
import useGetCategories from "../views/categories/UseGetCategories";

const Header = () => {
  const signUp = useSelector((state) => state.signUp);
  const signIn = useSelector((state) => state.signIn);
  const categories = useSelector((state) => state.allCategories);
  const token = localStorage.getItem("token");
  const cartId = localStorage.getItem("cartId");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } =
    useCart();
  const { fetchCartItems } = useGetCart();
  const { fetchData } = useGetCategories();
  useEffect(() => {
    fetchData();
    fetchCartItems();
  }, []);

  const handleProfileButton = () => {
    navigate("/user-profile");
  };
  const handleSignUpButton = () => {
    navigate("/sign-up");
  };
  const handleSignInButton = () => {
    navigate("/sign-in");
  };
  const handleLogOutButton = () => {
    clearCart();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("cartId");
    dispatch({
      type: "SIGNIN_ERROR",
    });
    navigate("/home");
  };

  const handleChange = (e) => {
    navigate(`/category/${e.target.value}`);
  };

  return (
    <header className="p-3 border-bottom bg-light">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="row align-items-center">
              <div className="col-md-1 col-2">
                <Link to="/home?page=1">
                  <i className="bi bi-bag-heart fa-2x"></i>
                </Link>
              </div>
              <div className="col-md-8 col-10">
                <Search />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-end align-items-center">
              <div className="me-md-3 me-0">
                <select className="form-select">
                  {categories?.categories?.map((category) => (
                    <option
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="me-md-3 me-0">
                <div className="position-relative d-inline me-md-3 me-0">
                  <Link to="/cart" className="btn btn-primary">
                    <i className="bi bi-cart3"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle">
                      {cart.length > 0 && cart.length}
                    </span>
                  </Link>
                </div>
              </div>
              {token && (
                <div className="me-md-3 me-0">
                  <button
                    type="button"
                    className="btn btn-secondary rounded-circle border"
                    aria-expanded="false"
                    aria-label="Profile"
                    onClick={handleProfileButton}
                  >
                    <i className="bi bi-person-square"></i>
                  </button>
                </div>
              )}
              <div>
                {!token && (
                  <>
                    <button
                      type="submit"
                      className="btn btn-primary m-md-2 me-0 mb-2"
                      onClick={handleSignUpButton}
                    >
                      Sign Up
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary m-md-2 me-0 mb-2"
                      onClick={handleSignInButton}
                    >
                      Sign In
                    </button>
                  </>
                )}
                {token && (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleLogOutButton}
                  >
                    Log out
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import useGetCategories from "../views/categories/UseGetCategories";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AdminHeader = () => {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.allCategories);
  const { fetchData } = useGetCategories();

  useEffect(() => {
    fetchData();
  }, []);
  const handleLogOutButton = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/home?page=1");
  };

  const handleChange = (e) => {
    navigate(`/admin/category/${e.target.value}`);
  };

  return (
    <header className="bg-light" style={{ padding: "20px" }}>
      <div className="row align-items-center">
        <div className="col-md-1 text-center">
          <Link to="/admin/products?page=1">
            <i class="bi bi-bag-heart fa-2x"></i>
          </Link>
        </div>
        <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
          <select className="form-select" onChange={handleChange}>
            {categories?.categories?.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-5">
          <Search />
        </div>
        <div className="col-md-3 d-flex justify-content-end align-items-center">
          <div className="d-flex">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleLogOutButton}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

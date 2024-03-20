import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`d-flex flex-column flex-shrink-0 bg-light fixed ${
        isSidebarOpen ? "open" : "closed"
      }`}
      style={{
        width: isSidebarOpen ? "240px" : "100px",
        padding: "0px 0px 16px 16px",
      }}
    >
      <button
        className="btn btn-link d-flex justify-content-start align-items-start p-3"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <i className="bi bi-toggle-on fa-2x"></i>
        ) : (
          <i className="bi bi-toggle2-off fa-2x"></i>
        )}
      </button>

      {isSidebarOpen && (
        <>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <h4
                className="nav-link link-dark"
                onClick={() => navigate("/admin")}
              >
                <i className="bi bi-house p-2 fa-2x"></i>
                Dashboard
              </h4>
            </li>
            <li>
              <h4
                className="nav-link link-dark"
                onClick={() => navigate("/admin/orders")}
              >
                <i className="bi bi-table p-2 fa-2x"></i>
                Orders
              </h4>
            </li>
            <li>
              <h4
                className="nav-link link-dark"
                onClick={() => navigate("/admin/products?page=1")}
              >
                <i className="bi bi-grid-fill  p-2 fa-2x"></i>
                Products
              </h4>
            </li>
            <li>
              <h4
                className="nav-link link-dark"
                onClick={() => navigate("/admin/categories")}
              >
                <i className="bi bi-grid-1x2 p-2 fa-2x"></i>
                Categories
              </h4>
            </li>
            <li>
              <h4
                className="nav-link link-dark"
                onClick={() => navigate("/admin/customers")}
              >
                <i className="bi bi-person-square p-2 fa-2x"></i>
                Customers
              </h4>
            </li>
            <li>
              <h4
                className="nav-link link-dark"
                onClick={() => navigate("/admin/create-category")}
              >
                <i className="bi bi-plus-square p-2 fa-2x"></i>
                Create Category
              </h4>
            </li>
            <li>
              <h4
                className="nav-link link-dark"
                onClick={() => navigate("/admin/create-product")}
              >
                <i className="bi bi-plus-square-fill p-2 fa-2x"></i>
                Create Product
              </h4>
            </li>
          </ul>
          <hr />
        </>
      )}
    </div>
  );
};

export default SideBar;

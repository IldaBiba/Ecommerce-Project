import React, { useEffect } from "react";
import { Dropdown, NavbarToggle } from "react-bootstrap";
import "./Dashboard.css";
import UseGetDashboard from "./UseGetDashboard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { fetchData, response } = UseGetDashboard();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  console.log(response);
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Dashboard</h1>
      </div>

      <section className="section dashboard">
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              <div className="col-xxl-4 col-md-6">
                <div className="card info-card sales-card">
                  <div className="card-body">
                    <h5 className="card-title">Sales</h5>

                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-cart"></i>
                      </div>
                      <div className="ps-3">
                        <h6>{response?.totalOrders}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-4 col-md-6">
                <div className="card info-card revenue-card">
                  <div className="card-body">
                    <h5 className="card-title">Revenue</h5>

                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-currency-dollar"></i>
                      </div>
                      <div className="ps-3">
                        <h6>${response?.totalRevenue}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-4 col-xl-12">
                <div className="card info-card customers-card">
                  <div className="card-body">
                    <h5 className="card-title">Customers</h5>

                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-people"></i>
                      </div>
                      <div className="ps-3">
                        <h6>{response?.customers}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card recent-sales overflow-auto">
                  <div className="card-body">
                    <h5 className="card-title">Recent Sales</h5>

                    <table className="table table-borderless datatable">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Customer</th>
                          <th scope="col">Product</th>
                          <th scope="col">Price</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {response?.latestSales.map((sale, index) => (
                          <tr key={index}>
                            <th
                              scope="row"
                              onClick={() => {
                                navigate(`/admin/orders/${sale.order_id}`);
                              }}
                            >
                              #{sale.order_id}
                            </th>
                            <td>{sale.username}</td>
                            <td>
                              <span className="text-primary">
                                {sale.orderItems[0].title}
                              </span>
                            </td>
                            <td>${sale.orderItems[0].price_order}</td>
                            <td>
                              <span
                                className={`badge bg-${
                                  sale.status_name === "accepted"
                                    ? "success"
                                    : sale.status_name === "returned"
                                    ? "danger"
                                    : "warning"
                                }`}
                              >
                                {sale.status_name.charAt(0).toUpperCase() +
                                  sale.status_name.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="card top-selling overflow-auto">
                  <div className="card-body pb-0">
                    <h5 className="card-title">Top Selling</h5>

                    <table className="table table-borderless">
                      <thead>
                        <tr>
                          <th scope="col">Product</th>
                          <th scope="col">Price</th>
                          <th scope="col">Sold</th>
                          <th scope="col">Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        {response?.topProducts.map((product, index) => (
                          <tr key={index}>
                            <td>
                              <span
                                className="text-primary fw-bold"
                                onClick={() =>
                                  navigate(
                                    `/admin/single-product/${product.orderproduct_id}`
                                  )
                                }
                              >
                                {product.productTitle}
                              </span>
                            </td>
                            <td>${product.unitPrice}</td>
                            <td className="fw-bold">{product.totalQuantity}</td>
                            <td>${product.totalRevenue}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card recent-orders overflow-auto">
              <div className="card-body">
                <h5 className="card-title">Recent Orders</h5>
                <ul className="list-group list-group-flush">
                  {response?.latestSales.map((order, index) => (
                    <li
                      className="list-group-item d-flex align-items-center"
                      key={index}
                    >
                      <div
                        className={`order-icon rounded-circle blurred-text bg-${
                          order.status_name === "accepted"
                            ? "success"
                            : order.status_name === "returned"
                            ? "danger"
                            : "primary"
                        } text-white d-flex align-items-center justify-content-center`}
                        onClick={() => {
                          navigate(`/admin/orders/${order.order_id}`);
                        }}
                      >
                        #{order.order_id}
                      </div>
                      <div className="ps-3">
                        <h6>
                          <span className="text-primary fw-bold">
                            #{order.order_id}
                          </span>
                        </h6>
                        <p className="m-0 small">{order.username}</p>
                      </div>
                      <span className="ms-auto fw-bold">
                        $
                        {parseFloat(
                          order.orderItems.reduce(
                            (total, item) =>
                              total + parseFloat(item.price_order),
                            0
                          )
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;

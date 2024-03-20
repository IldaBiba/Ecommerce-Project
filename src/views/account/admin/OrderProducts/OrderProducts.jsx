import { useEffect } from "react";
import UseGetOrderProducts from "./UseGetOrderProducts";
import { useSelector } from "react-redux";

const OrderProducts = () => {
  const { fetchData } = UseGetOrderProducts();
  const orderProducts = useSelector(
    (state) => state.orderProductsAdmin.orderProducts
  );
  useEffect(() => {
    fetchData();
  }, []);
  console.log(orderProducts);

  return (
    <div className="container mt-5">
      <h2>Order Details</h2>
      <div className="row">
        <div className="col-md-6">
          <p>
            <strong>Order ID:</strong>{" "}
            {orderProducts?.response?.order?.order_id}
          </p>
          <p>
            <strong>City:</strong> {orderProducts?.response?.order?.city}
          </p>
          <p>
            <strong>Phone Number:</strong>{" "}
            {orderProducts?.response?.order?.phone_number}
          </p>
          <p>
            <strong>Address:</strong> {orderProducts?.response?.order?.address}
          </p>
          <p>
            <strong>Payment Method:</strong>{" "}
            {orderProducts?.response?.order?.payment_method}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {orderProducts?.response?.order?.status_name}
          </p>
        </div>
      </div>
      <h3 className="mt-4">Order Items</h3>
      <div className="row mt-2">
        {orderProducts?.response?.orderItems.map((item) => (
          <div key={item.orderitem_id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={`http://localhost:3001/${item.path}`}
                className="card-img-top img-fluid"
                alt={item.title}
                style={{ height: "200px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <p>
                  <strong>Price:</strong> ${item.price}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderProducts;

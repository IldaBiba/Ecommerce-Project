import { useEffect } from "react";
import UseGetOrders from "./UseGetOrders";
import SelectComponent from "../../../../components/Select/Select";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { Button } from "bootstrap";

const AdminOrders = () => {
  const allOrders = useSelector((state) => state.orderAdmin);
  const { fetchData, orderStatus, handleEditOrderStatus } = UseGetOrders();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const calculateTotalPrice = (orderItems) => {
    console.log("hey", orderItems);
    let totalPrice = 0;
    orderItems.forEach((item) => {
      totalPrice += parseFloat(item.price_order);
    });
    return totalPrice.toFixed(2);
  };
  console.log(allOrders);

  return (
    <>
      {allOrders.loading && <LoadingSpinner />}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Date</th>
              <th>Status Order</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.order &&
              allOrders.order.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{order.username}</td>
                  <td>{order.email}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>
                    <SelectComponent
                      status={orderStatus}
                      handleEditOrderStatus={handleEditOrderStatus}
                      order={order.order_id}
                      defaultValue={order.order_status}
                    />
                  </td>
                  <td>${calculateTotalPrice(order.orderItems)}</td>
                  <td className="text-center" style={{ width: "100px" }}>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/orders/${order.order_id}`);
                      }}
                    >
                      See Order Products
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminOrders;

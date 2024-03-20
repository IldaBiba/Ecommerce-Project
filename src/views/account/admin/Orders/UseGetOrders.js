import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import url from "../../../../apiUrl";

const UseGetOrders = () => {
  const token = localStorage.getItem("token");
  const [orderStatus, setOrderStatus] = useState([]);
  const dispatch = useDispatch();

  const fetchOrderStatus = async () => {
    try {
      const response = await axios.get(`${url}admin/order-status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.response.success) {
        setOrderStatus(response.data.response.response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.response.response);
      if (response.data.response.success) {
        dispatch({
          type: "ORDERS_SUCCESS",
          payload: response.data.response.response,
        });
        fetchOrderStatus();
      } else {
        dispatch({
          type: "ORDERS_ERROR",
          payload: response.data.response.response,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditOrderStatus = async (order_id, status_id) => {
    try {
      const response = await axios.post(
        `${url}admin/edit-order-status`,
        {
          order_id: order_id,
          status_id: status_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return { fetchData, orderStatus, handleEditOrderStatus };
};

export default UseGetOrders;

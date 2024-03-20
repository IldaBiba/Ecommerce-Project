import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import url from "../../../../apiUrl";

const UseGetOrders = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [statusOrder, setStatusOrder] = useState(false);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}user/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.response.success) {
        setOrders(response.data.response.response);
        dispatch({
          type: "GETORDERS_SUCCESS",
          payload: response.data.response.response,
        });
      } else {
        dispatch({
          type: "GETORDERS_ERROR",
          payload: response.data.response.response,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const cancelOrder = async (status, orderId, createdAt) => {
    let data;
    console.log(status);
    const now = new Date();
    const createdAtDate = new Date(createdAt);
    const oneWeekAgo = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 7
    );

    if (createdAtDate <= oneWeekAgo) {
      toast.error(
        "We are very sorry to say a week has already passed so we can't cancel or return your order."
      );
    } else {
      data = {
        statusValue: status,
        orderId: orderId,
      };

      try {
        const response = await axios.post(`${url}user/cancel-order`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.data.success) {
          toast(`The order will get ${status}`);
          setStatusOrder(!statusOrder);
        }
        console.log("hey", response);
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/sign-in");
        return null;
      }
    }
  };

  return { fetchData, orders, cancelOrder, statusOrder };
};

export default UseGetOrders;

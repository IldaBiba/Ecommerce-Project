import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import url from "../../apiUrl";
import { useCart } from "../../Context/CartContext";
import { useState } from "react";

const UseCheckout = () => {
  const [shippingMethods, setShippingMethods] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { clearCart, cart } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(cart.length);

  const getShippingMethods = async () => {
    try {
      const response = await axios.get(`${url}user/get-shipping-methods`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.data.response.succes) {
        setShippingMethods(response.data.response.response);
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const checkoutSubmit = async (data) => {
    console.log(data);
    console.log(cart.length);
    if (cart.length > 0) {
      try {
        console.log("hi, erdhi ktu");
        const response = await axios.post(`${url}user/create-order`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.data.response.success) {
          toast.error(response.data.message);
          dispatch({
            type: "CHECKOUT_ERROR",
            payload: response.data.response.response,
          });
        } else {
          toast(response.data.message);
          dispatch({
            type: "CHECKOUT_SUCCESS",
            payload: response.data.response,
          });
          clearCart();
        }
      } catch (error) {
        throw new Error(error);
      }
    } else {
      toast(
        "You need to gave items in your cart in order for you to do a purchase"
      );
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    checkoutSubmit,
    getShippingMethods,
    shippingMethods,
  };
};

export default UseCheckout;

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import url from "../../../../apiUrl";

const useSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartId = localStorage.getItem("cartId");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${url}user/sign-in`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const user_id = response.data?.response?.user?.user_id;
      console.log(user_id);
      console.log(response.data.response.success);

      if (response.data.response.success) {
        const token = response.data.response.token;

        dispatch({
          type: "SIGNIN_SUCCESS",
          payload: { token, userData: response.data.response.user },
        });
        localStorage.setItem("token", token);
        localStorage.setItem("role", response.data.response.user.role);

        try {
          const response = await axios.get(`${url}user/get-cart`, {
            params: {
              cartId: cartId,
              userId: user_id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (err) {
          console.log(err);
        }
        if (response.data.response.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home?page=1");
        }
      } else {
        toast.error(response.data.message);
        dispatch({
          type: "SIGNIN_ERROR",
          payload: response.data.response.response,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { register, handleSubmit, errors, onSubmit };
};

export default useSignIn;

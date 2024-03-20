import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import url from "../../../../apiUrl";

const useSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${url}user/sign-up`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data, "here");
      console.log(response.data.response.success);

      if (!response.data.response.success) {
        toast.error(response.data.message);
        dispatch({
          type: "SIGNUP_ERROR",
          payload: response.data.response.response,
        });
      } else {
        toast(response.data.message);
        dispatch({
          type: "SIGNUP_SUCCESS",
          payload: response.data.response,
        });
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
  return { register, handleSubmit, errors, onSubmit };
};

export default useSignUp;

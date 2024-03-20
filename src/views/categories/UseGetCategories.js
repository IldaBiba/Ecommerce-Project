import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import url from "../../apiUrl";

const useGetCategories = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}admin/categories`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (
        response?.response?.status === 500 ||
        response?.response?.status === 401
      ) {
        navigate("/sign-in");
      }
      if (response.data.response.success) {
        dispatch({
          type: "GETCATEGORIES_SUCCESS",
          payload: response.data.response.response,
        });
      } else {
        dispatch({
          type: "GETCATEGORIES_ERROR",
          payload: response.data.response.response,
        });
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/sign-in");
    }
  };

  const handleDeleteCategoryButton = async (category_id) => {
    if (role === "admin") {
      console.log(category_id);
      try {
        const data = {
          category_id: category_id,
        };

        const response = await axios.post(`${url}admin/delete-category`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        if (response.data.success) {
          toast(response.data.message);
        } else {
          toast(response.data.message);
        }
      } catch (err) {
        console.error("Error deleting product:", err);

        localStorage.removeItem("token");
      }
    }
  };
  return { fetchData, handleDeleteCategoryButton };
};

export default useGetCategories;

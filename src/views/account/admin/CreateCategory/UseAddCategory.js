import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import url from "../../../../apiUrl";

const useCreateCategory = (categoryid) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(categoryid);
  const [defaultValue, setDefaultValue] = useState();
  const token = localStorage.getItem("token");
  const handleCategorySubmit = async (data, event) => {
    try {
      let response;
      if (categoryid) {
        response = await axios.post(
          "http://localhost:3001/admin/create-category",
          data,
          {
            params: {
              categoryid: categoryid,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(`${url}admin/create-category`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      console.log(response.data.response);
      console.log(response.data.message);
      if (response.data.response.success) {
        toast(response.data.message);
        dispatch({
          type: "CREATECATEGORY_SUCCESS",
          payload: response.data.response.response,
        });
      } else {
        toast(response.data.message);
        dispatch({
          type: "CREATECATEGORY_ERROR",
          payload: response.data.response.response,
        });
      }
      event.target.reset();
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/sign-in");
    }
  };
  const handleSingleCategory = async () => {
    try {
      const response = await axios.get(`${url}admin/single-category`, {
        params: {
          categoryid: categoryid,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDefaultValue(response.data.response.response[0]);
      console.log(response.data.message);
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/sign-in");
    }
  };

  return { handleCategorySubmit, handleSingleCategory, defaultValue };
};

export default useCreateCategory;

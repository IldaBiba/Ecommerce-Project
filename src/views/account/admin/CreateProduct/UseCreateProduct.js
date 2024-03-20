import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import url from "../../../../apiUrl";

const useCreateProduct = (productid) => {
  const dispatch = useDispatch();
  const [defaultValue, setDefaultValue] = useState();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleProductSubmit = async (data, event) => {
    console.log(data);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("category", data.id_category);
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }
    formData.append("description", data.description);
    formData.append("stock", data.stock);

    let response;
    if (productid) {
      response = await axios.post(
        "http://localhost:3001/admin/create-product",
        formData,
        {
          params: {
            productId: productid,
          },
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.data?.response?.success) {
        toast(response.data.message);
      } else {
        toast(response.data.message);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("price", data.price);
        formData.append("category", data.category);
        for (let i = 0; i < data.images.length; i++) {
          formData.append("images", data.images[i]);
        }
        formData.append("description", data.description);
        formData.append("stock", data.stock);
        console.log(formData);
        response = await axios.post(
          "http://localhost:3001/admin/create-product",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (response.status === 401) {
          navigate("/sign-in");
        }
        if (response.status === 500) {
          navigate("/error");
        }
        if (response.data.response.success) {
          toast(response.data.message);
          dispatch({
            type: "CREATEPRODUCT_SUCCESS",
            payload: response.data.response.response,
          });
        } else {
          toast(response.data.message);
          dispatch({
            type: "CREATEPRODUCT_ERROR",
            payload: response.data.response.response,
          });
        }
        event.target.reset();
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/sign-in");
      }
    }
  };
  const handleSingleProduct = async () => {
    try {
      const response = await axios.get(`${url}admin/single-product`, {
        params: {
          productId: productid,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.response.response[0]);
      setDefaultValue(response.data.response.response[0]);
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/sign-in");
    }
  };

  return { handleProductSubmit, handleSingleProduct, defaultValue };
};
export default useCreateProduct;

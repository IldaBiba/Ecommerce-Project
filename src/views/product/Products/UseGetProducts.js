import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import url from "../../../apiUrl";

const UseGetProducts = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");
  const page = searchParams.get("page");

  const [currentPage, setCurrentPage] = useState(page);
  const [recordsPerPage] = useState(8);
  const [nPages, setNpages] = useState();

  const fetchData = async () => {
    dispatch({
      type: "GETPRODUCTS_LOADING",
    });
    try {
      const response = await axios.get(
        `${url}admin/products?search=${searchQuery}&currentPage=${currentPage}&recordsPerPage=${recordsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.response.success) {
        setNpages(response.data.response.totalPages);
        dispatch({
          type: "GETPRODUCTS_SUCCESS",
          payload: response.data.response.response,
        });
      } else {
        dispatch({
          type: "GETPRODUCTS_ERROR",
          payload: response.data.response.response,
        });
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/sign-in");
    }
  };

  return {
    fetchData,
    nPages,
    currentPage,
    setCurrentPage,
    recordsPerPage,
  };
};

export default UseGetProducts;

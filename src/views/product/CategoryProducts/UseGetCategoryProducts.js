import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import url from "../../../apiUrl";
import { useState } from "react";

const UseGetCategoryProducts = () => {
  const categoryId = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(2);
  const [nPages, setNpages] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${url}admin/products/category?categoryid=${categoryId.categoryId}&currentPage=${currentPage}&recordsPerPage=${recordsPerPage}`
      );
      console.log(response);

      if (response.data.response.success) {
        console.log(response.data.response.totalPages);
        setNpages(response.data.response.response.nPages);
        dispatch({
          type: "GETCATEGORYPRODUCTS_SUCCESS",
          payload: response.data.response?.response?.results,
        });
      } else {
        dispatch({
          type: "GETCATEGORYPRODUCTS_ERROR",
          payload: response.data.message,
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  return { fetchData, currentPage, setCurrentPage, recordsPerPage, nPages };
};
export default UseGetCategoryProducts;

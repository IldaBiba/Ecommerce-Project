import axios from "axios";
import { useDispatch } from "react-redux";

import url from "../../../../apiUrl";

const UseGetCustomers = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}admin/customers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.data.response.success) {
        dispatch({
          type: "CUSTOMERS_SUCCESS",
          payload: response.data.response.response,
        });
      } else {
        dispatch({
          type: "CUSTOMERS_ERROR",
          payload: response.data.response.response,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { fetchData };
};

export default UseGetCustomers;

import { useDispatch } from "react-redux";
import url from "../../../../apiUrl";
import axios from "axios";
import { useParams } from "react-router-dom";

const UseGetOrderProducts = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const orderId = useParams();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${url}admin/order-products?orderId=${orderId.orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.data.response.success) {
        dispatch({
          type: "ORDERPRODUCTS_SUCCESS",
          payload: response.data.response,
        });
      } else {
        dispatch({
          type: "ORDERPRODUCTS_ERROR",
          payload: response.data.response,
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  };
  return { fetchData };
};
export default UseGetOrderProducts;

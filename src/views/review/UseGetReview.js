import axios from "axios";
import url from "../../apiUrl";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const UseGetReview = () => {
  const productId = useParams("productId");
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}user/get-reviews`, {
        params: {
          productId: productId.productId,
        },
      });
      if (response.data.response.succes) {
        dispatch({
          type: "REVIEW_SUCCESS",
          payload: response.data.response.response,
        });
      } else {
        dispatch({
          type: "REVIEW_ERROR",
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  };
  return { fetchData };
};

export default UseGetReview;

import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import url from "../../../../apiUrl";

const UseGetUser = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}user/user-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.response.success) {
        setUser(response.data.response.response[0]);
        dispatch({
          type: "GETUSER_SUCCESS",
          payload: response.data.response.response[0],
        });
      } else {
        dispatch({
          type: "GETUSER_ERROR",
          payload: response.data.response.response,
        });
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/sign-in");
    }
  };

  const handleButtonClick = () => {
    navigate("/edit-profile");
  };
  return { fetchData, user, handleButtonClick };
};

export default UseGetUser;

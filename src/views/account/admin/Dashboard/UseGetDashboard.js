import axios from "axios";
import url from "../../../../apiUrl";
import { useState } from "react";

const UseGetDashboard = () => {
  const token = localStorage.getItem("token");
  const [response, setResponse] = useState();
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}admin/get-dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      setResponse(response.data);
    } catch (err) {
      throw new Error(err);
    }
  };

  return { fetchData, response };
};

export default UseGetDashboard;

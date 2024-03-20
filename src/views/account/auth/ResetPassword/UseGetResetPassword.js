import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import url from "../../../../apiUrl";

const UseGetResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q");
  console.log(searchQuery);

  const token = localStorage.getItem("token");

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        `${url}user/reset-password?np=${searchQuery}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast(response.data.message);
        navigate("/sign-in");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  return { register, handleSubmit, errors, getValues, onSubmit };
};

export default UseGetResetPassword;

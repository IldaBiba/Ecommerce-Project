import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import url from "../../../../apiUrl";

const UseGetReset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(`${url}user/reset`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      toast(response.data.message);
    } catch (err) {
      throw new Error(err);
    }
  };
  return { register, handleSubmit, errors, onSubmit };
};

export default UseGetReset;

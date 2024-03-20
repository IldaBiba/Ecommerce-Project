import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useCart } from "../../../Context/CartContext";
import { toast } from "react-toastify";
import url from "../../../apiUrl";

const UseSingleProduct = (productId) => {
  console.log(productId);
  const [product, setProduct] = useState();
  const [relatedProducts, setRelatedProducts] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${url}admin/single-product?productId=${productId.productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.response.success) {
        dispatch({
          type: "GETPRODUCT_SUCCESS",
          payload: response.data.response,
        });

        try {
          const data = await axios.get(
            `${url}admin/products/related?categoryid=${response.data.response?.response[0]?.id_category}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(data);
          if (data.data.response.success) {
            setRelatedProducts(data.data.response.response);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        dispatch({
          type: "GETPRODUCT_ERROR",
          payload: response.data.response.response[0],
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  const createCart = async () => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) {
      try {
        const response = await axios.post(
          `${url}user/create-cart`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const mycartId = response.data.response.response.insertId;
        localStorage.setItem("cartId", mycartId);
        return mycartId;
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/sign-in");
        return null;
      }
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      updateQuantity(productId.productId, newQuantity);
      return newQuantity;
    });
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        updateQuantity(productId.productId, newQuantity);
        return newQuantity;
      });
    }
  };

  const handleAddToCartButton = async () => {
    try {
      const mycartId = await createCart(); // Wait for createCart to complete
      const cartId = localStorage.getItem("cartId");
      let data;

      if (cartId) {
        data = {
          cartId: cartId,
          product: { product_id: productId.productId, quantity: quantity },
        };
      } else {
        data = {
          cartId: mycartId,
          product: { product_id: productId.productId, quantity: quantity },
        };
      }

      const response = await axios.post(`${url}user/add-to-cart-item`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      console.log(response.data.response.success);
      if (response.data.response.success) {
        console.log("hey");
        addToCart(productId.productId, quantity);
        toast(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteButton = async () => {
    if (role === "admin") {
      try {
        const data = {
          product_id: productId.productId,
        };

        const response = await axios.post(`${url}admin/delete-product`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data.success) {
          toast(response.data.message);
        } else {
          toast(response.data.message);
        }
      } catch (err) {
        console.error("Error deleting product:", err);

        localStorage.removeItem("token");
      }
    }
  };

  return {
    fetchData,
    handleAddToCartButton,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    handleDeleteButton,
    relatedProducts,
    quantity,
  };
};
export default UseSingleProduct;

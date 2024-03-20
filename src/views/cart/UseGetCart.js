import { useCart } from "../../Context/CartContext";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import url from "../../apiUrl";

const useGetCart = () => {
  const token = localStorage.getItem("token");
  const cartId = localStorage.getItem("cartId");
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } =
    useCart();
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    if (!token) {
      try {
        const response = await axios.get(`${url}user/cart`, {
          params: {
            cartId: cartId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCartItems(response.data.response.response);
        clearCart();
        if (response.data.response.response.length > 0) {
          response.data.response.response.map((item) => {
            console.log(item);
            let product = {
              product_id: item.cartproduct_id,
              title: item.title,
              price: item.price,
            };
            let newQuantity = item.quantity;
            addToCart(product, newQuantity);
          });
        }
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/sign-in");
      }
    } else {
      try {
        const response = await axios.get(`${url}user/cart/user`, {
          params: {
            cartId: cartId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCartItems(response.data.response.response);
        clearCart(); // Clear existing cart items
        if (response.data.response.response.length > 0) {
          response.data.response.response.map((item) => {
            let product = {
              product_id: item.cartproduct_id,
              title: item.title,
              price: item.price,
              // Adjust this based on the structure of your response data
            };
            let newQuantity = item.quantity;
            addToCart(product, newQuantity);
          });
          // Add transformed items to the cart
        }
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/sign-in");
        return null;
      }
      localStorage.removeItem("cartId");
    }
  };
  return { fetchCartItems, cartItems };
};

export default useGetCart;

import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";

const CartItem = ({ cartItem, categories, onChange }) => {
  const token = localStorage.getItem("token");
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  const removeItemFromCart = (cartItem) => {
    const updatedCart = cart.filter(
      (item) => item.productId !== cartItem.cartproduct_id
    );
    removeFromCart();
    addToCart(updatedCart);
  };
  const handleRemoveFromCartButton = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/user/delete-cart-item",
        {
          cartItemId: cartItem.cartitem_id,
          //   userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      removeItemFromCart(cartItem);
      onChange(cartItem.price * cartItem.quantity);
      removeFromCart();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card mb-3 ">
      <div className="card-body d-flex justify-content-around align-items-center">
        <h6 className="card-title ">{cartItem.title}</h6>
        <h6 className="card-text">Quantity: {cartItem.quantity}</h6>
        <h6 className="card-text">${cartItem.price}</h6>
        <Button variant="primary" onClick={handleRemoveFromCartButton}>
          <i class="bi bi-trash"></i>
        </Button>
      </div>
    </div>
  );
};

export default CartItem;

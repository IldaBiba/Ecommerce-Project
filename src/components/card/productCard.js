import React, { useEffect, useReducer, useState } from "react";
import { Card, Button } from "react-bootstrap";
import LikeButton from "../LikeButton"; // Assuming you have a LikeButton component
import CarouselComponent from "../carousel/Carousel";
import axios from "axios";
import actions from "redux-form/lib/actions";
import { useCart } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import url from "../../apiUrl";
const ProductCard = ({ product, onDelete, relatedProduct, size }) => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const createCart = async () => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) {
      try {
        const response = await axios.post(
          "http://localhost:3001/user/create-cart",
          {}, // Empty object or data if needed
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
  const handleDeleteProduct = () => {
    onDelete(product);
  };

  const handleAddToCartButton = async () => {
    try {
      const mycartId = await createCart();
      const cartId = localStorage.getItem("cartId");
      let data;

      if (cartId) {
        data = {
          cartId: cartId,
          product: { ...product, quantity: quantity },
        };
      } else {
        data = {
          cartId: mycartId,
          product: { ...product, quantity: quantity },
        };
      }
      console.log(cart);

      const response = await axios.post(`${url}user/add-to-cart-item`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.response.success) {
        const existingCartItem = cart.find(
          (item) => item.productId === product.product_id
        );

        if (existingCartItem) {
          const updatedQuantity = existingCartItem.quantity + quantity;
          updateQuantity(existingCartItem.productId, updatedQuantity);
          toast("Quantity updated in the cart");
        } else {
          addToCart(product, quantity);
          toast("Product added to cart");
        }
      } else {
        toast.error("Failed to add product to cart");
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      updateQuantity(product.product_id, newQuantity);
      return newQuantity;
    });
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity - 1;
        updateQuantity(product.product_id, newQuantity);
        return newQuantity;
      });
    }
  };

  const handleSingleProductButton = () => {
    if (relatedProduct) {
      if (role === "admin") {
        navigate(`/admin/single-product/${relatedProduct?.product_id}`);
      } else {
        navigate(`/single-product/${relatedProduct?.product_id}`);
      }
    } else {
      if (role === "admin") {
        navigate(`/admin/single-product/${product?.product_id}`);
      } else {
        navigate(`/single-product/${product?.product_id}`);
      }
    }
  };

  const handleEditProduct = () => {
    navigate(`/admin/create-product/${product.product_id}`);
  };

  if (relatedProduct) {
    return (
      <Card id={relatedProduct.product_id}>
        <CarouselComponent relatedImages={relatedProduct?.images} />
        <Card.Body>
          <Card.Title onClick={handleSingleProductButton}>
            {relatedProduct.title}
          </Card.Title>
          <Card.Text>
            Category: {relatedProduct.category_name}
            <br />
            Price: ${relatedProduct.price}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
  return (
    <Card className="m-3">
      <CarouselComponent
        images={product?.image_paths || product?.images}
        size={size}
      />
      <Card.Body>
        <Card.Title onClick={handleSingleProductButton}>
          {product?.title}
        </Card.Title>
        <Card.Text>
          Category: {product?.category_name}
          <br />
          Price: ${product?.price}
        </Card.Text>
        {role !== "admin" ? (
          <div className="d-flex flex-row flex-lg-row justify-content-between align-items-center">
            <div className="quantity-controls d-flex align-items-center">
              <Button
                variant="outline-secondary"
                className="me-2"
                onClick={handleDecreaseQuantity}
              >
                <i className="bi bi-dash"></i>
              </Button>
              <span className="quantity-number">{quantity}</span>
              <Button
                variant="outline-secondary"
                className="ms-2"
                onClick={handleIncreaseQuantity}
              >
                <i className="bi bi-plus"></i>
              </Button>
            </div>
            <Button
              variant="primary"
              size="sm"
              className="m-1 d-flex align-items-center"
              onClick={handleAddToCartButton}
            >
              <i className="bi bi-cart p-1"></i>
              Add to Cart
            </Button>
          </div>
        ) : (
          <div className="d-flex flex-column flex-lg-row">
            <Button
              variant="primary"
              className="m-1 d-flex align-items-center"
              onClick={handleDeleteProduct}
            >
              <i className="bi bi-trash-fill me-2"></i>
              Delete Product
            </Button>
            <Button
              variant="primary"
              className="m-1 d-flex align-items-center"
              onClick={handleEditProduct}
            >
              <i className="bi bi-pencil-square me-2"></i>
              Edit Product
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

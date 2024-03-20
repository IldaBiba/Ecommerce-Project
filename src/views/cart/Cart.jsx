import React, { useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import CartItem from "../../components/card/cartItem";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useCart } from "../../Context/CartContext";
import useGetCart from "./UseGetCart";
import { useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Cart = (props) => {
  const token = localStorage.getItem("token");
  const cartId = localStorage.getItem("cartId");
  const navigate = useNavigate();
  const { fetchCartItems, cartItems } = useGetCart();

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let newTotalPrice = 0;

    cartItems.forEach((cartItem) => {
      const itemPrice = parseFloat(cartItem.price);
      if (!isNaN(itemPrice)) {
        // Check if the conversion was successful
        newTotalPrice += itemPrice * cartItem.quantity;
      }
    });
    setTotalPrice(newTotalPrice);
  }, [cartItems]);
  // if (totalPrice === 0) {
  //   fetchCartItems();
  // }

  useEffect(() => {
    fetchCartItems();
  }, [totalPrice]);

  const handleCheckOutButton = () => {
    if (!token) {
      navigate("/sign-in");
    } else {
      navigate("/check-out");
    }
  };

  const refreshPage = (data) => {
    setTotalPrice(data + totalPrice);
  };

  return (
    <>
      {!cartItems && <LoadingSpinner />}
      {props.checkout ? (
        <Card
          style={{
            width: "100%",
            margin: "50px auto",

            textAlign: "center",
            backgroundColor: "#f8f9fa",
          }}
        >
          <Card.Body>
            <Row className="justify-content-center">
              <Col md={8} lg={12}>
                {cartItems.map((cartItem) => (
                  <CartItem
                    key={cartItem.id}
                    cartItem={cartItem}
                    onChange={refreshPage}
                  />
                ))}
              </Col>
            </Row>
            <Card.Text style={{ fontSize: "1.3rem" }}>
              Price: {totalPrice}$
            </Card.Text>
            {props.shippingValue && (
              <Card.Text style={{ fontSize: "1.1rem", color: "red" }}>
                + shipping: {props.shippingValue * totalPrice}$
              </Card.Text>
            )}
            <Card.Text style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              Total Price: {totalPrice + props.shippingValue * totalPrice}$
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <div
          style={{
            minHeight: "70vh",
            gridTemplateRows: "auto 1fr auto",
          }}
        >
          <Card
            style={{
              width: "100%",
              maxWidth: "800px",
              margin: "50px auto",
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#f8f9fa",
            }}
          >
            <Card.Body>
              <Card.Title style={{ fontSize: "2rem", marginBottom: "20px" }}>
                Your Shopping Cart
              </Card.Title>
              <Row className="justify-content-center">
                <Col md={8} lg={12}>
                  {cartItems.map((cartItem) => (
                    <CartItem
                      key={cartItem.id}
                      cartItem={cartItem}
                      onChange={refreshPage}
                    />
                  ))}
                </Col>
              </Row>
              <Card.Text
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Total Price: ${totalPrice}
              </Card.Text>
              <Button
                variant="primary"
                style={{ fontSize: "1.2rem" }}
                onClick={handleCheckOutButton}
              >
                Checkout
              </Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default Cart;

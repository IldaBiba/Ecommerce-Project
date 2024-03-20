import React from "react";
import Carousel from "../components/carousel/Carousel";
import Products from "./product/Products/Products";
import { useParams } from "react-router-dom";

const Home = () => {
  let { userId, cartId } = useParams();
  const size = 5;
  return (
    <div
      style={{
        minHeight: "100vh",
        gridTemplateRows: "auto 1fr auto",
        overflow: "hidden",
      }}
    >
      <Products size={size} />
    </div>
  );
};

export default Home;

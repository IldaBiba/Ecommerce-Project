import { useParams } from "react-router-dom";
import UseSingleProduct from "./UseSIngleProduct";
import { useEffect } from "react";
import CarouselComponent from "../../../components/carousel/Carousel";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ProductCard from "../../../components/card/productCard";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ReviewForm from "../../../components/Forms/ReviewForm";
import Review from "../../review/Review";
import StarRating from "../../../components/StarRating/StarRating";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const productId = useParams();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const dispatch = useDispatch;
  const product = useSelector((state) => state.singleProduct);
  const [rating, setRating] = useState();

  const {
    fetchData,
    handleAddToCartButton,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    handleDeleteButton,
    relatedProducts,
    quantity,
  } = UseSingleProduct(productId);

  useEffect(() => {
    fetchData();
  }, [productId]);
  const size = "818px";

  const onChange = (value) => {
    setRating(value);
  };

  return (
    <div className="container-fluid">
      {product.loading && <LoadingSpinner />}
      <div className="g-4 row row-cols-md-4 row-cols-1 d-flex m-auto justify-content-center">
        <div className="col-md-4 m-4 col-lg-4">
          {product?.product?.response[0]?.images && (
            <CarouselComponent
              images={product?.product?.response[0]?.images}
              size={size}
            />
          )}
        </div>
        <div className="col-md-4 m-5 col-lg-5">
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            {product?.product?.response[0]?.title}
          </h1>
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
              Category:
            </p>
            <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>
              {product?.product?.response[0]?.category_name}
            </p>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
              Description:
            </p>
            <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>
              {product?.product?.response[0]?.description}
            </p>
          </div>
          <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            Price:{" "}
            <span style={{ fontWeight: "bold" }}>
              ${product?.product?.response[0]?.price}
            </span>
          </p>
          <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
            Stock:{" "}
            <span
              style={{
                color:
                  product?.product?.response[0]?.stock > 0 ? "green" : "red",
              }}
            >
              {product?.product?.response[0]?.stock > 0
                ? "In Stock"
                : "Out of Stock"}
            </span>
          </p>

          {role === "admin" && (
            <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
              Stock:{" "}
              <span
                style={{
                  color:
                    product?.product?.response[0]?.stock > 0 ? "green" : "red",
                }}
              >
                {product?.product?.response[0]?.stock}
              </span>
            </p>
          )}

          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
              Rating:{" "}
            </p>
            <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>
              <StarRating
                defaultValue={
                  product?.product?.averageRating
                    ? product?.product?.averageRating
                    : "0"
                }
              />
            </p>
          </div>
          {role !== "admin" ? (
            <>
              <div className="quantity-controls p-1">
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
                <Button
                  variant="primary"
                  className="m-3"
                  onClick={handleAddToCartButton}
                >
                  <i className="bi bi-cart p-1"></i>
                  Add to Cart
                </Button>

                <ReviewForm onChange={onChange} />
              </div>
            </>
          ) : (
            <Button
              variant="primary"
              className="mt-2"
              onClick={handleDeleteButton}
            >
              <i className="bi bi-trash p-1"></i>
              Delete Product
            </Button>
          )}
        </div>
      </div>
      <Review value={rating} />
      <div
        className={`g-4 row row-cols-md-4 row-cols-1 d-flex  m-auto justify-content-center`}
      >
        <Col style={{ display: "contents" }}>
          <h1>Related Products</h1>
        </Col>
      </div>

      <div
        className={`g-4 row row-cols-md-4 row-cols-1 d-flex  m-5 justify-content-center mt-5 `}
      >
        {!relatedProducts && <LoadingSpinner />}
        {relatedProducts &&
          relatedProducts.map((product) => (
            <Col key={product?.product_id}>
              <ProductCard relatedProduct={product} />
            </Col>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};
export default SingleProduct;

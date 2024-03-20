import React from "react";
import { Container, Card, Col } from "react-bootstrap";
import ProductForm from "../../../../components/Forms/ProductForm";
import useCreateProduct from "./UseCreateProduct";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const CreateProduct = ({ categories }) => {
  const { productid } = useParams();
  const { handleProductSubmit, handleSingleProduct, defaultValue } =
    useCreateProduct(productid);

  console.log(defaultValue, productid);

  useEffect(() => {
    if (productid) {
      handleSingleProduct();
    }
  }, [productid]);

  return (
    <div className="d-flex align-items-center justify-content-center m-auto mt-5 col-lg-8 col-md-6 col-sm-8 col-12">
      <Col xs={12} sm={8} md={6} lg={10}>
        <Card>
          <Card.Header>
            <h2>Create Product</h2>
          </Card.Header>
          <Card.Body className="p-4">
            <ProductForm
              categories={categories}
              onSubmit={handleProductSubmit}
              defaultValue={defaultValue}
            />
          </Card.Body>
        </Card>
      </Col>
      <ToastContainer />
    </div>
  );
};

export default CreateProduct;

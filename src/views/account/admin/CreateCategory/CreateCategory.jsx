import React, { useEffect } from "react";
import CategoryForm from "../../../../components/Forms/CategoryForm"; // Adjust the path based on your project structure
import { Container, Card, Col } from "react-bootstrap";
import useCreateCategory from "./UseAddCategory";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";

const CreateCategory = () => {
  let { categoryid } = useParams();

  const { handleCategorySubmit, handleSingleCategory, defaultValue } =
    useCreateCategory(categoryid);

  useEffect(() => {
    if (categoryid) {
      handleSingleCategory();
    }
  }, [categoryid]);
  console.log(defaultValue);

  return (
    <div className="d-flex align-items-center justify-content-center col-lg-8 col-md-6 col-sm-8 col-12 m-auto mt-5">
      <Col xs={12} sm={8} md={6} lg={8}>
        <Card
          style={{ padding: "20px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
        >
          <Card.Header>
            <h2>Create Category</h2>
          </Card.Header>
          <Card.Body className="p-4">
            <CategoryForm
              onSubmit={handleCategorySubmit}
              defaultValue={defaultValue}
            />
          </Card.Body>
        </Card>
      </Col>
      <ToastContainer />
    </div>
  );
};

export default CreateCategory;

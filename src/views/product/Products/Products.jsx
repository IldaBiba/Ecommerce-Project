import { useEffect, useState } from "react";
import UseGetProducts from "./UseGetProducts";
import { Col } from "react-bootstrap";
import ProductCard from "../../../components/card/productCard";
import { ToastContainer } from "react-toastify";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios, { all } from "axios";
import { toast } from "react-toastify";
import Pagination from "../../../components/Pagination/Pagination";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";

const Products = (props) => {
  const allProducts = useSelector((state) => state.allProducts);
  const { fetchData, products, nPages, currentPage, setCurrentPage } =
    UseGetProducts();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [clicked, setClicked] = useState(0);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");
  const page = searchParams.get("page");

  useEffect(() => {
    fetchData();
  }, [clicked, searchQuery, page]);

  console.log(allProducts);

  const handleDeleteButton = async (product) => {
    if (role === "admin") {
      console.log(product.product_id);
      try {
        const data = {
          product_id: product.product_id,
        };

        const response = await axios.post(
          "http://localhost:3001/admin/delete-product",

          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.data.response.success) {
          toast(response.data.message);
          console.log("hi");
          setClicked((prev) => prev + 1);
        } else {
          toast(response.data.message);
        }
      } catch (err) {
        console.error("Error deleting product:", err);

        localStorage.removeItem("token");
        //navigate("/sign-in");
      }
    }
  };

  return (
    <div>
      {allProducts.loading && <LoadingSpinner />}
      {allProducts?.products?.length == 0 && (
        <h3 className="text-center mt-5">No products found!</h3>
      )}
      <div
        className={`g-4 row row-cols-md-${props.size} row-cols-1 d-flex`}
        style={{ overflow: "hidden", minHeight: "80vh" }}
      >
        {allProducts.products &&
          allProducts.products.map((product) => (
            <Col key={product.product_id}>
              <ProductCard product={product} onDelete={handleDeleteButton} />
            </Col>
          ))}

        <ToastContainer />
      </div>
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Products;

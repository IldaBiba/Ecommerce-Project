import { useEffect } from "react";
import UseGetCategoryProducts from "./UseGetCategoryProducts";
import { useSelector } from "react-redux";
import ProductCard from "../../../components/card/productCard";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";

const CategoryProducts = () => {
  const products = useSelector((state) => state.categoryProducts);
  const { fetchData, nPages, setCurrentPage, currentPage } =
    UseGetCategoryProducts();
  const categoryId = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  console.log(products);
  useEffect(() => {
    fetchData();
  }, [categoryId.categoryId, page]);
  const size = "300px";
  console.log(products);
  const navigate = `/category/${categoryId.categoryId}`;
  return (
    <div style={{ overflow: "hidden" }}>
      {products.loading && <LoadingSpinner />}
      {!products.products && (
        <h3 className="text-center mt-5">
          No products found for this category!
        </h3>
      )}
      <div>
        <div
          className={`g-4 row row-cols-md-5 row-cols-1 d-flex`}
          style={{ overflow: "hidden", minHeight: "80vh" }}
        >
          {products?.products?.map((product) => (
            <Col key={product.product_id}>
              <ProductCard product={product} size={size} />
            </Col>
          ))}
        </div>
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          value={navigate}
        />
      </div>
    </div>
  );
};

export default CategoryProducts;

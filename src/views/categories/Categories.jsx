import useGetCategories from "./UseGetCategories";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Categories = () => {
  const allCategories = useSelector((state) => state.allCategories);
  const { fetchData, handleDeleteCategoryButton } = useGetCategories();
  const [deleted, setDeleted] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [deleted]);

  return (
    <>
      {allCategories.loading && <LoadingSpinner />}
      {allCategories.categories &&
        allCategories.categories.map((category) => (
          <div className="row mb-4" key={category.category_id}>
            <div className="col">
              <div className="card">
                <div className="card-body ">
                  <h5 className="card-title">{category.name}</h5>
                  <p className="card-text">
                    Description: {category.description}
                  </p>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => {
                        setDeleted((prev) => prev + 1);
                        handleDeleteCategoryButton(category.category_id);
                      }}
                    >
                      <i className="bi bi-trash fa-2x"></i>
                      <span className="visually-hidden">Delete</span>
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        navigate(
                          `/admin/create-category/${category.category_id}`
                        )
                      }
                    >
                      <i className="bi bi-eraser-fill fa-2x"></i>
                      <span className="visually-hidden">Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      <ToastContainer />
    </>
  );
};

export default Categories;

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SelectComponent from "../Select/Select";
import { Button } from "react-bootstrap";
import url from "../../apiUrl";

const ProductForm = ({ onSubmit, defaultValue }) => {
  console.log(defaultValue);
  const [images, setImages] = useState(defaultValue?.images || []);
  const [token] = useState(localStorage.getItem("token"));
  const [categories, setCategories] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}admin/categories`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (
          response?.response?.status === 500 ||
          response?.response?.status === 401
        ) {
          navigate("/sign-in");
        }
        setCategories(response.data.response.response);
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/sign-in");
      }
    };
    fetchData();
  }, [token, navigate]);

  useEffect(() => {
    if (defaultValue) {
      Object.keys(defaultValue).forEach((key) => {
        setValue(key, defaultValue[key]);
      });
    }
    if (defaultValue) {
      setImages(defaultValue.images);
    }
  }, [defaultValue, setValue]);

  const handleDeleteImageButton = async (imageId) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/admin/delete-image-product",
        { image_id: imageId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.status === 500 || response?.status === 401) {
        navigate("/sign-in");
      } else {
        setImages(images.filter((image) => image.id !== imageId));
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/sign-in");
    }
  };

  const onSubmitForm = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="mt-4 p-4 shadow bg-white rounded"
      encType="multipart/form-data"
      method="POST"
      action="/admin/create-product"
    >
      <div className="mb-3">
        <label htmlFor="title" className="form-label mb-2">
          Title
        </label>
        <input
          type="text"
          className={`form-control ${errors.title ? "is-invalid" : ""}`}
          id="title"
          placeholder="Enter product title"
          {...register("title", { required: "Product Title is required" })}
        />
        {errors.title && (
          <div className="invalid-feedback">{errors.title.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label mb-2">
          Price
        </label>
        <input
          type="number"
          className={`form-control ${errors.price ? "is-invalid" : ""}`}
          id="price"
          placeholder="Enter product price"
          {...register("price", {
            required: "Product Price is required",
            min: 0,
          })}
        />
        {errors.price && (
          <div className="invalid-feedback">{errors.price.message}</div>
        )}
      </div>
      <div className="mb-3 d-flex flex-column">
        <label htmlFor="category" className="form-label mb-2">
          Category
        </label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <SelectComponent
              field={field}
              options={categories}
              defaultValue={defaultValue?.id_category}
              className={`form-control ${errors.category ? "is-invalid" : ""}`}
            />
          )}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="stock" className="form-label mb-2">
          Stock
        </label>
        <input
          type="number"
          className={`form-control ${errors.stock ? "is-invalid" : ""}`}
          id="stock"
          placeholder="Enter product stock"
          {...register("stock", {
            required: "Product Stock is required",
            min: 0,
          })}
        />
        {errors.stock && (
          <div className="invalid-feedback">{errors.stock.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="image" className="form-label mb-2">
          Image
        </label>
        <Controller
          control={control}
          name="images"
          rules={{ required: "Recipe pictures are required" }}
          render={({ field }) => (
            <input
              onChange={(event) => {
                const files = event.target.files;
                console.log(files);

                selectedFiles.push(files[0]);
                field.onChange(selectedFiles);
                console.log(selectedFiles);
              }}
              type="file"
              id="images"
              className="form-control"
              multiple
            />
          )}
        />
      </div>

      <div className="row">
        {images &&
          images.length > 0 &&
          images.map((image, index) => (
            <div key={index} className="col-sm-6 col-md-4 col-lg-3 mb-3">
              <div className="position-relative">
                <img
                  src={`http://localhost:3001/${image.path}`}
                  alt={`Product Image ${index + 1}`}
                  className="img-fluid rounded"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImageButton(image.id)}
                  className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                >
                  <i className="bi bi-x-lg"></i> {/* Bootstrap X icon */}
                </button>
              </div>
            </div>
          ))}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label mb-2">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          placeholder="Enter product description"
          {...register("description", {
            required: "Product Description is required",
          })}
        />
        {errors.description && (
          <div className="invalid-feedback">{errors.description.message}</div>
        )}
      </div>
      {defaultValue ? (
        <Button type="submit" variant="primary" className="btn-lg mt-3">
          Edit Product
        </Button>
      ) : (
        <Button type="submit" variant="primary" className="btn-lg mt-3">
          Create Product
        </Button>
      )}
    </form>
  );
};

export default ProductForm;

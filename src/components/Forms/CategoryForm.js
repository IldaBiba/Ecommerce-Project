import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";

const CreateCategory = ({ onSubmit, defaultValue }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validateDescription = (value) => {
    return (
      value.length <= 300 ||
      "Description should have a maximum of 300 characters"
    );
  };
  console.log(defaultValue);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 shadow bg-white rounded"
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label mb-2">
          Name
        </label>
        <input
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          id="name"
          placeholder="Enter category name"
          {...register("name", {
            required: "Name is required",
            validate: {
              notEmpty: (value) => value.trim() !== "" || "Name is required",
            },
          })}
          defaultValue={defaultValue?.name && defaultValue.name}
        />
        {errors.name && (
          <div className="invalid-feedback">{errors.name.message}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label mb-2">
          Description
        </label>
        <textarea
          className={`form-control ${errors.description ? "is-invalid" : ""}`}
          id="description"
          placeholder="Enter category description"
          {...register("description", {
            required: "Description is required",
            validate: {
              notEmpty: (value) =>
                value.trim() !== "" || "Description is required",
            },
          })}
          defaultValue={defaultValue?.description && defaultValue.description}
        ></textarea>
        {errors.description && (
          <div className="invalid-feedback">{errors.description.message}</div>
        )}
      </div>
      {defaultValue ? (
        <div className="d-grid">
          <Button type="submit" variant="primary" className="btn-lg mt-3">
            Edit Category
          </Button>
        </div>
      ) : (
        <div className="d-grid">
          <Button type="submit" variant="primary" className="btn-lg mt-3">
            Create Category
          </Button>
        </div>
      )}
    </form>
  );
};

export default CreateCategory;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import url from "../../apiUrl";
import StarRating from "../StarRating/StarRating";
import { toast } from "react-toastify";

const ReviewForm = ({ onChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [rating, setRating] = useState(null);
  const [clicked, setClicked] = useState(false);
  const token = localStorage.getItem("token");
  const productId = useParams().productId;

  const onSubmit = async (data, event) => {
    if (!token) {
      toast.error("You need to be logged in to give review to a product!");
    } else {
      console.log(data);
      console.log(rating);
      if (rating) {
        const obj = {
          review: data.description,
          rating: rating,
        };
        try {
          const response = await axios.post(
            `${url}user/give-review?productId=${productId}`,
            obj,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.response.success) {
            toast(response.data.message);
          } else {
            toast.error(response.data.message);
          }
          setClicked(!clicked);

          event.target.reset();

          onChange(clicked);
          event.target.reset();
          setRating(null);
        } catch (err) {
          throw new Error(err);
        }
      }
    }
  };

  const handleRatingSelect = (value) => {
    setRating(value);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 shadow bg-white rounded"
    >
      <div className="mb-3">
        <h6>You need to give a star rating!</h6>
        <StarRating
          handleRatingSelect={handleRatingSelect}
          rating={rating}
          // {...register("rating", { required: "Rating is required" })}
          // error={errors.rating}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label mb-2">
          Add a review for the product
        </label>
        <textarea
          className={`form-control ${errors.description ? "is-invalid" : ""}`}
          id="description"
          placeholder=""
          {...register("description", {
            required: "Description is required",
            validate: {
              notEmpty: (value) =>
                value.trim() !== "" || "Description is required",
            },
          })}
        ></textarea>
        {errors.description && (
          <div className="invalid-feedback">{errors.description.message}</div>
        )}
      </div>

      <div style={{ width: "fit-content" }}>
        <Button type="submit" variant="primary" size="sm" className="mt-3">
          Submit Review
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;

import { useEffect } from "react";
import UseGetReview from "./UseGetReview";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StarRating from "../../components/StarRating/StarRating";

const Review = ({ value }) => {
  const { fetchData } = UseGetReview();
  const reviews = useSelector((state) => state.review);
  const productId = useParams("productId");
  useEffect(() => {
    fetchData();
  }, [value, productId.productId]);

  console.log(reviews);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Reviews</h2>
      <div className="row">
        {reviews?.review?.length > 0 ? (
          reviews?.review?.map((review) => (
            <div className="col-md-4 p-2" key={review.review_Id}>
              <div className="card mb-4 h-100">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{review.username}</h5>
                    <p className="card-text">{review.description}</p>
                  </div>
                  <p className="card-text">
                    <strong>Rating:</strong>{" "}
                    <StarRating defaultValue={review.rating_star} />
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-md-12 text-center">
            <h4>No reviews for this product yet!</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;

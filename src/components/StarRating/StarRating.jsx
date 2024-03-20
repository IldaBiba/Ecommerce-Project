import React from "react";
import { BsStar, BsStarFill } from "react-icons/bs";

const StarRating = ({ handleRatingSelect, rating, defaultValue }) => {
  const handleClick = (value) => {
    handleRatingSelect(value);
  };
  console.log(defaultValue, "hi");

  return (
    <>
      {defaultValue ? (
        <div className="m-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <span key={value} style={{ cursor: "default", fontSize: "24px" }}>
              {value <= defaultValue ? <BsStarFill /> : <BsStar />}
            </span>
          ))}
        </div>
      ) : (
        <div className="m-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              onClick={() => handleClick(value)}
              style={{ cursor: "pointer", fontSize: "24px" }}
            >
              {value <= rating ? <BsStarFill /> : <BsStar />}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default StarRating;

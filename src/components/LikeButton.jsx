import React, { useState } from "react";
import { Button } from "react-bootstrap";

const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Button variant="link" onClick={handleClick}>
      {isLiked ? (
        <i className="bi bi-heart-fill"></i>
      ) : (
        <i className="bi bi-heart"></i>
      )}
    </Button>
  );
};

export default LikeButton;

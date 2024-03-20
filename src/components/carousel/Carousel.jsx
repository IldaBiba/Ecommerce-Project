import React from "react";
import { Carousel, CarouselItem, Image } from "react-bootstrap";
import "./Carousel.css";
import url from "../../apiUrl";

const CarouselComponent = ({ images, relatedImages, size }) => {
  return (
    <Carousel interval={null}>
      {Array.isArray(images) &&
        images.length > 0 &&
        images.map((item, index) => (
          <Carousel.Item key={index}>
            <Image
              src={`${url}${typeof item === "string" ? item : item?.path}`}
              fluid
              className="card-img-top"
              style={{
                height: typeof item === "string" ? "300px" : size,
              }}
            />
          </Carousel.Item>
        ))}
      {Array.isArray(relatedImages) &&
        relatedImages.length > 0 &&
        relatedImages.map((item, index) => (
          <Carousel.Item key={index}>
            <Image
              src={`http://localhost:3001/${
                typeof item === "string" ? item : item.path
              }`}
              fluid
              className="card-img-top"
              style={{ height: typeof item === "string" ? "150px" : "300px" }}
            />
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default CarouselComponent;

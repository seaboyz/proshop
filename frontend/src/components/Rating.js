import React from "react";
import PropTypes from "prop-types";

const Rating = ({ rating, numReviews, color }) => {
  const numberOfFullStars = Math.floor(rating);
  const numberOfHalfStars = Math.round(rating % 1);

  return (
    <div className="rating">
      {Array(numberOfFullStars)
        .fill("")
        .map((_, index) => (
          <span key={index}>
            <i style={{ color }} className="fas fa-star"></i>
          </span>
        ))}
      {Array(numberOfHalfStars)
        .fill("")
        .map((_, index) => (
          <span key={index}>
            <i style={{ color }} className="fas fa-star-half-alt"></i>
          </span>
        ))}
      {numReviews} reviews
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  numReviews: PropTypes.number.isRequired,
  color: PropTypes.string,
};

export default Rating;

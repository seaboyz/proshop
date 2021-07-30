import React from "react";
import PropTypes from "prop-types";

const Rating = ({ rating, numReviews, color }) => {
  if (rating) {
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
  }

  return null;
};

Rating.defaultProps = {
  color: "#f8e825",
};

Rating.propTypes = {
  rating: PropTypes.number,
  numReviews: PropTypes.number,
  color: PropTypes.string,
};

export default Rating;

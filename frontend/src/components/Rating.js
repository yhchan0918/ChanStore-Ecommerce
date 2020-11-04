import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, text, color }) => {
  const numbers = [1, 2, 3, 4, 5];
  return (
    <div className="rating">
      {numbers.map((num) => (
        <span key={num}>
          <i
            style={{ color }}
            className={
              value >= num
                ? 'fas fa-star'
                : value >= num - 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          />
        </span>
      ))}

      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

Rating.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Rating;

import React from 'react';
import './RoundedRectangle.css';

const RoundedRectangle = ({ children, size = 'standard', title }) => {
  return (
    <div className={`rounded-rectangle ${size}`}>
      {size === 'large2' && <h3>{title}</h3>}
      {size === 'large2' ? (
        <>
          <div className="container-left">
            {/* Elements for the left container */}
            {children.left}
          </div>
          <div className="container-right">
            {/* Elements for the right container */}
            {children.right}
          </div>
        </>
      ) : size === 'small2' ? (
        <>
          <h3>{title}</h3>
          <div className="container2">
            {/* Elements for the container2 */}
            {children}
          </div>
        </>
      ) : size === 'large' || size === 'small' ? (
        <>
          {title && <h3>{title}</h3>}
          <div className="container">
            {/* Elements for the single container */}
            {children}
          </div>
        </>
      ) : (
        <>
          {children}
        </>
      )}
    </div>
  );
};

export default RoundedRectangle;

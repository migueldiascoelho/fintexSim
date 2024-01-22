import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './NetworthSlider.css';

const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const NetworthSlider = ({ label, value, onChange, max }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event) => {
    const inputValue = event.target.value.replace(/,/g, ''); // Remove commas
    onChange(parseInt(inputValue, 10) || 0);
  };

  const formattedValue = formatNumberWithCommas(value); // Format the value with commas
  let offset;
  if (value < 1000){
    offset = 8;
  } else {
    offset = 0;
  }

  return (
    <div className="networth-slider-container" style={{ position: 'relative' }}>
      <label className="networth-slider-label">{label}:</label>
      <Slider
        className="rc-slider"
        min={0}
        max={max}
        value={value}
        onChange={onChange}
        onBeforeChange={() => setIsEditing(true)} // Set flag to indicate editing
        onAfterChange={() => setIsEditing(false)} // Clear flag after slider change
      />
      <div
        className="networth-slider-value"
        style={{
          position: 'absolute',
          bottom: '-50%', // Adjust as needed to position above the handle
          left: `${Math.min((value / max) * 100, 100) + offset}%`,
          transform: 'translateX(-50%)',
          margin: '0 5px', // Adjust the margin as needed
        }}
        onClick={() => setIsEditing(true)} // Enable editing on click
      >
        <input
          className={`networth-slider-input ${isEditing ? '' : 'hidden-input'}`}
          type="text"
          value={formattedValue}
          onChange={handleInputChange}
          onBlur={() => setIsEditing(false)} // Disable editing on blur
        />
      </div>
    </div>
  );
};

export default NetworthSlider;

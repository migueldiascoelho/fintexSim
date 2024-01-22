// InputBar.js
import React from 'react';
import './InputBar.css';

const InputBar = ({ labelText, value, onChange }) => {
  return (
    <div className="input-bar-container">
      <p>
        <input id="input" type="number" value={value} onChange={onChange} required />
        <label htmlFor="input" alt={labelText} placeholder={labelText}></label>
      </p>
    </div>
  );
}

export default InputBar;

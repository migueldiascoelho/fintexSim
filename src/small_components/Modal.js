// Modal.js

import React from 'react';
import './Modal.css';

const Modal = ({ closeModal, breakEvenYears, returnIrr, holdingLength, newHouseValue, increase, yearMarks }) => {
  const handleModalClick = (e) => {
    // Prevent the event from propagating to the modal overlay
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={handleModalClick}>
        <button className="close-button" onClick={closeModal}>
          X
        </button>

        {/* Add a horizontal black line */}
        <div className="horizontal-line"></div>

        {/* Add a vertical black line */}
        <div className="vertical-line"></div>

        {/* Container for top left quadrant */}
        <div className="quadrant-container top-left">
          <div className="text-container">
            <p className="quadrant-text1">You will get back what you invested in:</p>
            <p className="quadrant-text11">~{breakEvenYears} Years</p>
          </div>
        </div>

        {/* Container for top right quadrant */}
        <div className="quadrant-container top-right">
          <div className="text-container">
            <p className="quadrant-text2">Return (IRR)</p>
            <p className="quadrant-text21">{returnIrr}%</p>
            <p className="quadrant-text22">per Year</p>
          </div>
        </div>

        {/* Container for bottom left quadrant */}
        <div className="quadrant-container bottom-left">
          <p className="quadrant-text3">
            After <span style={{ fontWeight: 'bold' }}>10 Years</span> you will have made <span style={{ color: yearMarks[0] && yearMarks[0] >= 0 ? '#197C00' : '#D51A31' }}>{yearMarks[0]?.toLocaleString()}</span>.
          </p>
          <p className="quadrant-text31">
            After <span style={{ fontWeight: 'bold' }}>20 Years</span> you will have made <span style={{ color: yearMarks[1] && yearMarks[1] >= 0 ? '#197C00' : '#D51A31' }}>{yearMarks[1]?.toLocaleString()}</span>.
          </p>
          <p className="quadrant-text32">
            After <span style={{ fontWeight: 'bold' }}>30 Years</span> you will have made <span style={{ color: yearMarks[2] && yearMarks[2] >= 0 ? '#197C00' : '#D51A31' }}>{yearMarks[2]?.toLocaleString()}</span>.
          </p>
        </div>





        {/* Container for bottom right quadrant */}
        <div className="quadrant-container bottom-right">
          <div className="text-container">
            <p className="quadrant-text4">Value After {holdingLength} Years</p>
            <p className="quadrant-text41">${newHouseValue.toLocaleString()}</p>
            <p className="quadrant-text42">+{increase}%</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Modal;

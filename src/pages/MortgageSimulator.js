// MortgageSimulator.js
import React, { useState } from 'react';
import './Mortgage.css'; // Adjust the path based on your project structure


const MortgageSimulator = () => {
  const [age, setAge] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [propertyValue, setPropertyValue] = useState('');
  const [downPayment, setDownPayment] = useState('');

  const handleDownPaymentChange = (event) => {
    // Ensure the down payment is not lower than 20% of the property value
    const newDownPayment = Math.max(event.target.value, 0.2 * propertyValue);
    setDownPayment(newDownPayment);
  };

  const handleCalculate = () => {

  };

  return (
    <div className="mortgage-container">
      <h2 className="mortgage-title">Mortgage Payment Simulator</h2>
      <form>
        <label className="mortgage-form-label">
          Property Value:
          <input
            className="mortgage-form-input"
            type="number"
            value={propertyValue}
            onChange={(e) => setPropertyValue(e.target.value)}
          />
        </label>
        <label className="mortgage-form-label">
          Down Payment:
          <input
            className="mortgage-form-input"
            type="number"
            value={downPayment}
            onChange={handleDownPaymentChange}
          />
        </label>
        <label className="mortgage-form-label">
          Interest Rate (%):
          <input
            className="mortgage-form-input"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </label>
        <label className="mortgage-form-label">
          Loan Term:
          <input
            className="mortgage-form-input"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <button
          className="mortgage-submit-button"
          type="button"
          onClick={handleCalculate}
        >
          Calculate Mortgage
        </button>
      </form>
    </div>
  );
};

export default MortgageSimulator;

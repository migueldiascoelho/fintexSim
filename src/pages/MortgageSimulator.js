// MortgageSimulator.js
import React, { useState } from 'react';
import './Mortgage.css'; // Adjust the path based on your project structure

const MortgageSimulator = () => {
  const [age, setAge] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [propertyValue, setPropertyValue] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null); // To store the result
  const [showModal, setShowModal] = useState(false); // To control modal visibility

  // No down payment limit
  const handleDownPaymentChange = (event) => {
    setDownPayment(event.target.value);
  };

  const handleCalculate = () => {
    const loanAmount = propertyValue - downPayment;
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = age * 12;

    // Mortgage calculation formula
    const monthlyMortgage =
      loanAmount *
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    // Update state with the calculated monthly payment
    setMonthlyPayment(monthlyMortgage.toFixed(2));
    setShowModal(true); // Show the modal with the result
  };

  // Modal component
  const Modal = ({ children, onClose }) => (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );

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
          Loan Term (years):
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

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3>Monthly Mortgage Payment</h3>
          <p>Your monthly payment is: ${monthlyPayment}</p>
        </Modal>
      )}
    </div>
  );
};

export default MortgageSimulator;

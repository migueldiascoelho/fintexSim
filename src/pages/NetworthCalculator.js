// NetworthCalculator.js

import React, { useState } from 'react';
import './Networth.css';
import NetworthSlider from '../small_components/NetworthSlider';
import RoundedRectangle from '../small_components/RoundedRectangle';

const NetworthCalculator = () => {
  // State for assets
  const [realEstateValue, setRealEstateValue] = useState(0);
  const [checkingAccounts, setCheckingAccounts] = useState(0);
  const [savingsAccounts, setSavingsAccounts] = useState(0);
  const [retirementAccounts, setRetirementAccounts] = useState(0);
  const [carsValue, setCarsValue] = useState(0);
  const [otherAssets, setOtherAssets] = useState(0);

  // State for liabilities
  const [realEstateLoans, setRealEstateLoans] = useState(0);
  const [creditCardDebt, setCreditCardDebt] = useState(0);
  const [personalLoans, setPersonalLoans] = useState(0);
  const [studentLoans, setStudentLoans] = useState(0);
  const [carLoans, setCarLoans] = useState(0);
  const [otherDebt, setOtherDebt] = useState(0);

  // Calculate net worth
  const calculateNetWorth = () => {
    const assetsTotal =
      realEstateValue +
      checkingAccounts +
      savingsAccounts +
      retirementAccounts +
      carsValue +
      otherAssets;

    const liabilitiesTotal =
      realEstateLoans +
      creditCardDebt +
      personalLoans +
      studentLoans +
      carLoans +
      otherDebt;

    const netWorth = assetsTotal - liabilitiesTotal;
    return {
      value: netWorth.toLocaleString(), // Format the value with commas
      isNegative: netWorth < 0,
    };
  };

  const netWorthData = calculateNetWorth();

  return (
    <div className="networth-container">
      {/* Assets */}
      <RoundedRectangle title="Assets" className="rectangles">
      <h3 style={{ letterSpacing: '10px' }}>ASSETS</h3>
      <h3 style={{ letterSpacing: '2px', opacity:0, fontSize: '20px' }}>LIABILITIES</h3>
        <NetworthSlider label="Real Estate Value" onChange={setRealEstateValue} value={realEstateValue} max={1000000} />
        <NetworthSlider label="Checking Accounts" onChange={setCheckingAccounts} value={checkingAccounts} max={100000} />
        <NetworthSlider label="Savings Accounts" onChange={setSavingsAccounts} value={savingsAccounts} max={200000} />
        <NetworthSlider label="Retirement Accounts" onChange={setRetirementAccounts} value={retirementAccounts} max={500000} />
        <NetworthSlider label="Cars Value" onChange={setCarsValue} value={carsValue} max={50000} />
        <NetworthSlider label="Other Assets" onChange={setOtherAssets} value={otherAssets} max={50000} />
      </RoundedRectangle>

      {/* Liabilities */}
      <RoundedRectangle title="Liabilities" className="rectangles">
      <h3 style={{ letterSpacing: '2px' }}>LIABILITIES</h3>
      <h3 style={{ letterSpacing: '2px', opacity:0, fontSize: '20px' }}>LIABILITIES</h3>
        <NetworthSlider label="Real Estate Loans" onChange={setRealEstateLoans} value={realEstateLoans} max={1000000} />
        <NetworthSlider label="Credit Card Debt" onChange={setCreditCardDebt} value={creditCardDebt} max={100000} />
        <NetworthSlider label="Personal Loans" onChange={setPersonalLoans} value={personalLoans} max={100000} />
        <NetworthSlider label="Student Loans" onChange={setStudentLoans} value={studentLoans} max={100000} />
        <NetworthSlider label="Car Loans" onChange={setCarLoans} value={carLoans} max={50000} />
        <NetworthSlider label="Other Debt" onChange={setOtherDebt} value={otherDebt} max={50000} />
      </RoundedRectangle>

      {/* Net Worth Value */}
      <RoundedRectangle title="Value" className="rectangles">
        <div className="networth-result">
          <h3 style={{ letterSpacing: '0px' }}>NETWORTH</h3>
          <p style={{ textAlign: 'center', marginTop: '50px' }}>
            This is your net worth:
          </p>
          <p
            className={`networth-display ${netWorthData.isNegative ? 'negative' : ''}`}
          >
            ${netWorthData.value}
          </p>
          {netWorthData.value === '0' ? (
            <p style={{ textAlign: 'center', marginTop: '60px', fontWeight: 'lighter', fontSize: '24px', paddingInline: '20px', lineHeight: '1.3' }}>
              Please enter the data using the sliders or by writing the value.
            </p>
          ) : netWorthData.isNegative ? (
            <p style={{ textAlign: 'center', marginTop: '60px', fontWeight: 'lighter', fontSize: '24px', paddingInline: '20px', lineHeight: '1.3' }}>
              Roll up your sleeves! We've got work to do...
            </p>
          ) : (
            <p style={{ textAlign: 'center', marginTop: '60px', fontWeight: 'lighter', fontSize: '24px', paddingInline: '20px', lineHeight: '1.3' }}>
              Keep going, you're definitely on the right track!
            </p>
          )}
        </div>
      </RoundedRectangle>
    </div>
  );
};

export default NetworthCalculator;

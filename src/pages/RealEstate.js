import React, { useState } from 'react';
import { irr } from 'financial';
import './RealEstate.css';
import RoundedRectangle from '../small_components/RoundedRectangle';
import InputBar from '../small_components/InputBar';
import Modal from '../small_components/Modal'; // Import your Modal component

const RealEstateInvestment = () => {
  // State for Purchase
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [useLoan, setUseLoan] = useState(false);
  const [downPayment, setDownPayment] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [closingCost, setClosingCost] = useState(0);
  const [needRepairs, setNeedRepairs] = useState(false);
  const [repairCost, setRepairCost] = useState(0);
  const [valueAfterRepair, setValueAfterRepair] = useState(0);

  // State for Recurring Operating Expenses
  const [propertyTax, setPropertyTax] = useState(0);
  const [totalInsurance, setTotalInsurance] = useState(0);
  const [maintenance, setMaintenance] = useState(0);
  const [otherCosts, setOtherCosts] = useState(0);
  const [inflation, setInflation] = useState(0);

  // State for Income
  const [monthlyRent, setMonthlyRent] = useState(0);
  const [otherMonthlyIncome, setOtherMonthlyIncome] = useState(0);
  const [managementFee, setManagementFee] = useState(0);

  // State for Sell
  const [knowSellPrice, setKnowSellPrice] = useState(false);
  const [valueAppreciation, setValueAppreciation] = useState(4);
  const [holdingLength, setHoldingLength] = useState(20);
  const [costToSell, setCostToSell] = useState(0);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [breakEvenYears, setBreakEvenYears] = useState(null);
  const [returnIrr, setReturnIrr] = useState(null);
  const [newHouseValue, setNewHouseValue] = useState(null);
  const [increase, setIncrease] = useState(null);
  const [yearMarks, setYearMarks] = useState([]);

  const calculateBreakEvenYears = () => {
    let initialInvestment;
    let originalCashFlow;
    let monthlyPayments;

    if (!useLoan) {
      initialInvestment = Number(purchasePrice) + Number(closingCost) + Number(propertyTax) + Number(totalInsurance) + Number(maintenance) + Number(otherCosts);
    } else {
      initialInvestment = Number(downPayment) + Number(closingCost) + Number(propertyTax) + Number(totalInsurance) + Number(maintenance) + Number(otherCosts);
    }

    if (!useLoan) {
      originalCashFlow = (Number(monthlyRent) * 12) + (Number(otherMonthlyIncome) * 12) - (Number(propertyTax) + Number(totalInsurance) + Number(maintenance) + Number(otherCosts));
    } else {
      monthlyPayments = ((purchasePrice - downPayment) * (interestRate / (100 * 12)) * (Math.pow(1 + (interestRate / (100 * 12)), (12 * loanTerm)))) / ((Math.pow(1 + (interestRate / (100 * 12)), (12 * loanTerm))) - 1);
      originalCashFlow = (Number(monthlyRent) * 12) + (Number(otherMonthlyIncome) * 12) - (Number(propertyTax) + Number(totalInsurance) + Number(maintenance) + Number(otherCosts) + (monthlyPayments * 12));
    }

    let adjustedCashFlow = originalCashFlow;
    let totalCashFlow = 0;
    let year = 0;

    while (totalCashFlow < initialInvestment) {
      adjustedCashFlow *= (1 + (Number(inflation) / 100));
      totalCashFlow += adjustedCashFlow;
      year++;
    }

    const breakEvenYears = year;
    return breakEvenYears;
  };

  const calculateIRR = () => {
    let initialInvestment;
    let originalCashFlow;
    let monthlyPayments;
  
    if (!useLoan) {
      if(!needRepairs){
      initialInvestment = Number(purchasePrice) + Number(closingCost) + Number(propertyTax) + Number(totalInsurance) + Number(maintenance) + Number(otherCosts);
    } else {
      initialInvestment = Number(purchasePrice) + Number(closingCost) + Number(propertyTax) + Number(totalInsurance) + Number(maintenance) + Number(otherCosts)+ Number(repairCost);
    }
      originalCashFlow = (Number(monthlyRent) * 12) + (Number(otherMonthlyIncome) * 12) - (Number(propertyTax) + Number(totalInsurance) + Number(maintenance) + Number(otherCosts));
    } else {
      initialInvestment = Number(downPayment) + Number(closingCost) + Number(propertyTax) + Number(totalInsurance) + Number(maintenance) + Number(otherCosts);
      monthlyPayments = ((Number(purchasePrice) - Number(downPayment)) * (Number(interestRate) / (100 * 12)) * (Math.pow(1 + (Number(interestRate) / (100 * 12)), (12 * Number(loanTerm))))) / ((Math.pow(1 + (Number(interestRate) / (100 * 12)), (12 * Number(loanTerm)))) - 1);
      originalCashFlow = (Number(monthlyRent) * 12) + (Number(otherMonthlyIncome) * 12) - (Number(propertyTax) + Number(totalInsurance) + Number(maintenance) + Number(otherCosts) + (monthlyPayments * 12));
    }
  
    let adjustedCashFlow = originalCashFlow;
    let totalCashFlow = 0;
    const cashFlows = [-initialInvestment];
  
    if (knowSellPrice) {
      for (let year = 1; year <= holdingLength; year++) {
        adjustedCashFlow *= Math.pow(1 + Number(inflation) / 100, year);
        totalCashFlow += adjustedCashFlow;
        cashFlows.push(totalCashFlow);
      }
    
      // Add the value that the house will be sold for to the last cash flow
      const finalValue = (totalCashFlow + (1 + (Number(valueAppreciation) / 100))) - costToSell; // Corrected calculation
      cashFlows[cashFlows.length - 1] += finalValue;
    } else {
      // If the house is not sold, calculate cash flows for 20 years
      for (let year = 1; year <= 20; year++) {
        adjustedCashFlow *= (1 + (Number(inflation) / 100));
        adjustedCashFlow += (adjustedCashFlow * Number(valueAppreciation) / 100); // Adjust for value appreciation
        totalCashFlow += adjustedCashFlow;
        cashFlows.push(totalCashFlow);
      }
    }

  
    const calculatedIRR = irr(cashFlows);
  
    // Check if IRR is NaN
    if (isNaN(calculatedIRR)) {
      console.error('Calculated IRR is NaN');
      return;
    }
  
    return (calculatedIRR*100).toFixed(2);
  };
  
  const calculateYearMarks = () => {

    let initialInvestment;

    if(!needRepairs){
      if (!useLoan){
      initialInvestment = Number(purchasePrice) + Number(closingCost) + Number(propertyTax) + Number(totalInsurance) + Number(maintenance) + Number(otherCosts);
    } else {
      initialInvestment = Number(downPayment) + Number(closingCost) + Number(propertyTax) + Number(totalInsurance) + Number(maintenance) + Number(otherCosts);
    }} else {
      if (!useLoan){
        initialInvestment = Number(purchasePrice) + Number(closingCost) + Number(propertyTax) + Number(totalInsurance) + Number(maintenance) + Number(otherCosts) + Number(repairCost);
      } else {
        initialInvestment = Number(downPayment) + Number(closingCost) + Number(propertyTax) + Number(totalInsurance) + Number(maintenance) + Number(otherCosts) + Number(repairCost);
      }
    }

    let sumOfCashFlows = [-initialInvestment];
    console.log(initialInvestment);

    if(!useLoan){
      if (!knowSellPrice){
        for (let i = 1; i<=30; i++){
          console.log("You will not sell the house")
          let cash = (Number(monthlyRent) * 12) + (Number(otherMonthlyIncome) * 12) - (Number(propertyTax) + Number(totalInsurance) + Number(maintenance) + Number(otherCosts));
          cash *= Math.pow((1 + (Number(inflation) / 100)), i);
          sumOfCashFlows.push(Math.round(sumOfCashFlows[i - 1] + cash));

        }
    } else {
        for (let i = 1; i<=holdingLength; i++){
          if (i !== Number(holdingLength)) {
            console.log("Yo will sell the house, the second for loop is working!");
            console.log("Holdig Length:", holdingLength);
            let cash = (Number(monthlyRent) * 12) + (Number(otherMonthlyIncome) * 12) - (Number(propertyTax) + Number(totalInsurance) + Number(maintenance) + Number(otherCosts));
            cash *= Math.pow((1 + (Number(inflation) / 100)), i);
            sumOfCashFlows.push(Math.round(sumOfCashFlows[i - 1] + cash));
          } else {
            console.log("the else is working!")
            let cash = (Number(monthlyRent) * 12) + (Number(otherMonthlyIncome) * 12) - (Number(propertyTax) + Number(totalInsurance) + Number(maintenance) + Number(otherCosts));
            cash *= Math.pow((1 + (Number(inflation) / 100)), i);
            let sale;
            if (!needRepairs){
              sale = Number(purchasePrice) * Math.pow((1 + (Number(valueAppreciation) / 100)), holdingLength - 1);
            } else {
              sale = Number(valueAfterRepair) * Math.pow((1 + (Number(valueAppreciation) / 100)), holdingLength - 1);
            }
            console.log("Sale:", sale);
            cash += (sale-costToSell);
            sumOfCashFlows.push(Math.round(sumOfCashFlows[i - 1] + cash));
          }

        }
      }} else {
          if (!knowSellPrice){
            for (let i = 1; i<=30; i++){
              console.log("You will not sell the house")
              const monthlyPayments = ((Number(purchasePrice) - Number(downPayment)) * (Number(interestRate) / (100 * 12)) * (Math.pow(1 + (Number(interestRate) / (100 * 12)), (12 * Number(loanTerm))))) / ((Math.pow(1 + (Number(interestRate) / (100 * 12)), (12 * Number(loanTerm)))) - 1);
              let cash = (Number(monthlyRent) * 12) + (Number(otherMonthlyIncome) * 12) - (Number(propertyTax) + Number(totalInsurance) + Number(maintenance) + Number(otherCosts) + monthlyPayments);
              cash *= Math.pow((1 + (Number(inflation) / 100)), i);
              sumOfCashFlows.push(Math.round(sumOfCashFlows[i - 1] + cash));
    
            }
        } else {
            for (let i = 1; i<=holdingLength; i++){
              if (i !== Number(holdingLength)) {
                console.log("Yo will sell the house, the second for loop is working!");
                console.log("Holdig Length:", holdingLength);
                const monthlyPayments = ((Number(purchasePrice) - Number(downPayment)) * (Number(interestRate) / (100 * 12)) * (Math.pow(1 + (Number(interestRate) / (100 * 12)), (12 * Number(loanTerm))))) / ((Math.pow(1 + (Number(interestRate) / (100 * 12)), (12 * Number(loanTerm)))) - 1);
                let cash = (Number(monthlyRent) * 12) + (Number(otherMonthlyIncome) * 12) - (Number(propertyTax) + Number(totalInsurance) + Number(maintenance) + Number(otherCosts) + monthlyPayments);
                cash *= Math.pow((1 + (Number(inflation) / 100)), i);
                sumOfCashFlows.push(Math.round(sumOfCashFlows[i - 1] + cash));
              } else {
                console.log("the else is working!")
                const monthlyPayments = ((Number(purchasePrice) - Number(downPayment)) * (Number(interestRate) / (100 * 12)) * (Math.pow(1 + (Number(interestRate) / (100 * 12)), (12 * Number(loanTerm))))) / ((Math.pow(1 + (Number(interestRate) / (100 * 12)), (12 * Number(loanTerm)))) - 1);
                let cash = (Number(monthlyRent) * 12) + (Number(otherMonthlyIncome) * 12) - (Number(propertyTax) + Number(totalInsurance) + Number(maintenance) + Number(otherCosts) + monthlyPayments);
                cash *= Math.pow((1 + (Number(inflation) / 100)), i);
                let sale;
                if (!needRepairs){
                  sale = Number(purchasePrice) * Math.pow((1 + (Number(valueAppreciation) / 100)), holdingLength - 1);
                } else {
                  sale = Number(valueAfterRepair) * Math.pow((1 + (Number(valueAppreciation) / 100)), holdingLength - 1);
                }
                console.log("Sale:", sale);
                cash += sale;
                sumOfCashFlows.push(Math.round(sumOfCashFlows[i - 1] + cash));
              }
    
            }
          }
    }

    const specificYears = [sumOfCashFlows[10], sumOfCashFlows[20], sumOfCashFlows[30]];
    if (knowSellPrice && holdingLength<30 && holdingLength>20){
      specificYears[2]=sumOfCashFlows[holdingLength];
    } else if (knowSellPrice && holdingLength<20 && holdingLength>10){
      specificYears[1]=sumOfCashFlows[holdingLength];
      specificYears[2]=sumOfCashFlows[holdingLength];
    } else if (knowSellPrice && holdingLength<10) {
      specificYears[0]=sumOfCashFlows[holdingLength];
      specificYears[1]=sumOfCashFlows[holdingLength];
      specificYears[2]=sumOfCashFlows[holdingLength];
    }

    console.log("Initial cash flow:", sumOfCashFlows[0])
    console.log(specificYears);

    return specificYears;
  }
  

  const calculateNewHouseValue = () => {

    let adjustedValue;
    if (!needRepairs) {
      adjustedValue = purchasePrice;
    } else {
      adjustedValue = valueAfterRepair;
    }
  
    for (let year = 1; year <= holdingLength; year++) {
      adjustedValue *= 1 + valueAppreciation / 100;
    }
  
    adjustedValue = Math.round(adjustedValue / 1000) * 1000;

    return adjustedValue;
  };

  const newHouseValIncrease = () => {
    const newValue = calculateNewHouseValue();
    const increase = Math.round(((newValue / purchasePrice) - 1) * 100);
  
    return increase;
  };
  
  
  

  const handleCalculate = () => {
    // Check if essential fields are filled
    if (!purchasePrice || !inflation || !monthlyRent) {
      alert("Please fill in Purchase Price, Inflation, and Monthly Rent before calculating.");
      return;
    }
  
    const breakEven = calculateBreakEvenYears();
    setBreakEvenYears(breakEven);
  
    const calculatedIRR = calculateIRR();
    setReturnIrr(calculatedIRR);
  
    const marks = calculateYearMarks();
    setYearMarks(marks);
  
    const newHouseVal = calculateNewHouseValue();
    setNewHouseValue(newHouseVal);
  
    const newIncrease = newHouseValIncrease();
    setIncrease(newIncrease);
  
    setShowModal(true);
  };
  

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="real-estate-container">
      {/* Purchase */}
      <RoundedRectangle size="large2" renderTitleInside={false} title="Purchase">
        {{
          right: (
            <>
              <label className="checkbox-container">
                <labelText>Use Loan?</labelText>
                <input type="checkbox" checked={useLoan} onChange={() => setUseLoan(!useLoan)} />
              </label>
              {useLoan && (
                <>
                  <InputBar labelText="Down Payment" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
                  <InputBar labelText="Interest Rate" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                  <InputBar labelText="Loan Term" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} />
                </>
              )}
            </>
          ),
          left: (
            <>
              <InputBar labelText="Purchase Price" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
              <InputBar labelText="Closing Cost" value={closingCost} onChange={(e) => setClosingCost(e.target.value)} />
              <label className="checkbox-container2">
                <labelText>Needs Repairs?</labelText>
                <input type="checkbox" checked={needRepairs} onChange={() => setNeedRepairs(!needRepairs)} />
              </label>
              {needRepairs && (
                <>
                  <InputBar labelText="Repair Cost" value={repairCost} onChange={(e) => setRepairCost(e.target.value)} />
                  <InputBar
                    labelText="Value After Repair"
                    value={valueAfterRepair}
                    onChange={(e) => setValueAfterRepair(e.target.value)}
                    className={`hidden-element ${!needRepairs ? 'hidden-element' : ''}`}
                  />
                </>
              )}
            </>
          ),
        }}
      </RoundedRectangle>

      {/* Recurring Operating Expenses */}
      <RoundedRectangle size="large" renderTitleInside={false} title="Expenses">
        <InputBar labelText="Property Tax(Yr)" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)} />
        <InputBar labelText="Insurance(Yr)" value={totalInsurance} onChange={(e) => setTotalInsurance(e.target.value)} />
        <InputBar labelText="Maintenance(Yr)" value={maintenance} onChange={(e) => setMaintenance(e.target.value)} />
        <InputBar labelText="Other Costs(Yr)" value={otherCosts} onChange={(e) => setOtherCosts(e.target.value)} />
        <InputBar labelText="Inflation(%)" value={inflation} onChange={(e) => setInflation(e.target.value)} />
      </RoundedRectangle>

      {/* Button Container */}
      <div className="button-container">
        <button onClick={handleCalculate}>Calculate</button>
      </div>

      {/* Sell */}
      <RoundedRectangle size="small2" renderTitleInside={false} title="Sell">
        <>
          <label className="checkbox-container">
            <labelText3>Do you want to sell?</labelText3>
            <input type="checkbox" checked={knowSellPrice} onChange={() => setKnowSellPrice(!knowSellPrice)} />
          </label>
          {knowSellPrice && (
            <>
              <InputBar labelText="Value Appreciation" value={valueAppreciation} onChange={(e) => setValueAppreciation(e.target.value)} />
              <InputBar labelText="Holding Length" value={holdingLength} onChange={(e) => setHoldingLength(e.target.value)} />
              <InputBar labelText="Cost to Sell" value={costToSell} onChange={(e) => setCostToSell(e.target.value)} />
            </>
          )}
        </>
      </RoundedRectangle>

      {/* Income */}
      <RoundedRectangle size="small" renderTitleInside={false} title="Income">
        <InputBar labelText="Monthly Rent" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} />
        <InputBar labelText="Other Monthly Income" value={otherMonthlyIncome} onChange={(e) => setOtherMonthlyIncome(e.target.value)} />
        <InputBar labelText="Management Fee" value={managementFee} onChange={(e) => setManagementFee(e.target.value)} />
      </RoundedRectangle>

      {/* Render the modal */}
      {showModal && <Modal closeModal={closeModal} breakEvenYears={breakEvenYears} returnIrr={returnIrr} yearMarks={yearMarks} holdingLength={holdingLength} newHouseValue={newHouseValue} increase={increase} />}
    </div>
  );
};

export default RealEstateInvestment;

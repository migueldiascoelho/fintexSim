import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import MortgageSimulator from './pages/MortgageSimulator';
import NetworthCalculator from './pages/NetworthCalculator';
import RealEstateInvestment from './pages/RealEstate';
import './App.css';
import fintexLogo from './graphics/fintexLogo.png';

const Networth = () => (
  <div>
    <NetworthCalculator />
  </div>
);

const RealEstate = () => (
  <div>
    <RealEstateInvestment />   
  </div>
);

const App = () => {
  return (
    <Router basename="/fintexSim">
      <div className="flex">
        {/* Side Menu */}
        <div className="side-menu-fixed">
          <div className="flex-col-items-center">
            <NavLink to="/" activeClassName="active" className="nav-link">Networth Calculator</NavLink>
            <NavLink to="/realestate" activeClassName="active" className="nav-link">Real Estate ROI</NavLink>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <header className="header">
          </header>
          <Routes>
            <Route path="/" element={<Networth />} />
            <Route path="/realestate" element={<RealEstate />} />
          </Routes>
          <img src={fintexLogo} alt="Fintex Logo" className="fintex-logo" />
          <div className="additional-text">
            {/* Your additional content goes here */}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

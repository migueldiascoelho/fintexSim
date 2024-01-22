import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import MortgageSimulator from './pages/MortgageSimulator';
import NetworthCalculator from './pages/NetworthCalculator';
import RealEstateInvestment from './pages/RealEstate';
import './App.css'; // Import your custom styles
import fintexLogo from './graphics/fintexLogo.png';

const Home = () => (
  <div>
    {/* Your Home component content goes here */}
  </div>
);

const Mortgage = () => (
  <div>
    <MortgageSimulator />
  </div>
);

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

const Contact = () => (
  <div>
    {/* Your Contact component content goes here */}
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="flex">
        {/* Side Menu */}
        <div className="side-menu-fixed">
          <div className="flex-col-items-center">
            <NavLink to="/" activeClassName="active" className="nav-link">Home</NavLink>
            <NavLink to="/mortgagepaymentsimulator" activeClassName="active" className="nav-link">Mortgage Payment SIM</NavLink>
            <NavLink to="/networthcalculator" activeClassName="active" className="nav-link">Networth Calculator</NavLink>
            <NavLink to="/realestate" activeClassName="active" className="nav-link">Real Estate ROI</NavLink>
            <NavLink to="/contact" activeClassName="active" className="nav-link">Contact</NavLink>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <header className="header">
            {/* Your existing header content goes here */}
          </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mortgagepaymentsimulator" element={<Mortgage />} />
            <Route path="/networthcalculator/*" element={<Networth />} />
            <Route path="/realestate" element={<RealEstate />} />
            <Route path="/contact" element={<Contact />} />
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

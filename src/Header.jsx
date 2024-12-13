import React, { useState } from "react";

import { Link } from 'react-router-dom';
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
        <div className="header">
      <h1>Travel Companion</h1>
      {/*Here the dynamically adding a class name*/}
      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li> <Link to="/weather">Weather</Link></li>
        <li><Link to="/currency-converter">Currency Converter</Link></li>
        <li><Link to="/expensetracker">Expense Tracker</Link></li>
      </ul>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      
    </div>
    
    </>
  );
}

export default Header;

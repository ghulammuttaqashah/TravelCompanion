import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home/Home';
import CurrencyConverter from './currencyConverter/currency-converter';
import Weather from './Weather/Weather';
import ExpenseTracker from './ExpenseTracker/ExpenseTracker';
function App() {
  return (
    <div className='app-container'>
      {/*Header and footer are outside because i have to visible them on all pages*/}
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/currency-converter" element={<CurrencyConverter />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/expensetracker" element={<ExpenseTracker />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

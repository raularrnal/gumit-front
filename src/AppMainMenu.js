// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import Admin from './components/Admin';
import './css/navPrincipal.css';
import Restaurants from './components/Restaurants';
import gumit from './img/gumit-banner.jpeg';
import AdminMenuPrincipal from './components/AdminMenuPrincipal';


const App = () => {

//  <Link to="/admin" className="admin-menu-item-first">Admin</Link>

  return (


    <Router>
      <div className="content-container">

      <Link to="/" style={{ textDecoration: 'none' }}>
      <img src={gumit == null  ? gumit: gumit} className="card-img-top-custom" alt='GUMIT BANNER' />
</Link>       
 <Routes>
          <Route path="/carta/:id" element={< AdminMenuPrincipal />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/" element={<Restaurants />} />
    
        </Routes>
      </div>
    </Router>

         
  );
};

export default App;

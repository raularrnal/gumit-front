// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CategoryList from './components/CategoryList';
import Admin from './components/Admin';
import './css/navPrincipal.css';
import Restaurants from './components/Restaurants';

const App = () => {
  return (
<Router>
      <div className="content-container">
        <nav>

        <div className="admin-menu-container-first">
           <Link to="/carta" className="admin-menu-item-first">Carta</Link>
          <Link to="/admin" className="admin-menu-item-first">Admin</Link>
          <Link to="/restaurant" className="admin-menu-item-first">Restaurantes</Link>

        </div>
        </nav>
        <Routes>
          <Route path="/carta" element={< CategoryList />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/restaurant/*" element={<Restaurants />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;

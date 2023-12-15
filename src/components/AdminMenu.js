// AdminMenu.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/AdminMenu.css'; // Importa el archivo CSS

const AdminMenu = () => {
  return (
    <div className="admin-menu-container">
      <Link to="/admin/categories" className="admin-menu-item">Categorías</Link>
      <Link to="/admin/products" className="admin-menu-item">Productos</Link>
    </div>
  );
};

export default AdminMenu;

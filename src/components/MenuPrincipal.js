// src/components/Admin.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoryManagement from './CategoryManagement';
import ProductManagement from './ProductManagement';
import AdminMenu from './AdminMenu'; // Importa el componente de menú
import '../css/AdminMenu.css'; // Importa el archivo de estilos para el menú

const Admin = () => {
  return (
    <div>
      <AdminMenu />
      <Routes>
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="products" element={<ProductManagement />} />
      </Routes>
    </div>
  );
};

export default Admin;

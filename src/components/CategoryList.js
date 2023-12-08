// src/components/CategoryList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './ProductList';

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8081/management/category/categories');
        setCategoryList(response.data.categoryList);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div>
      
      <ul className="category-list">
        {categoryList.map(category => (
          <li
            key={category.id}
            className={selectedCategoryId === category.id ? 'selected' : ''}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.description}
          </li>
        ))}
      </ul>
      {selectedCategoryId && <ProductList categoryId={selectedCategoryId} />}
    </div>
  );
};

export default CategoryList;

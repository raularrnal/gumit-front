// src/components/CategoryList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import { useParams } from 'react-router-dom';
import whatsapp from '../img/whatsapp_logo.svg'


const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
    const [error, setError] = useState(false);

  const { id } = useParams();
  const fetchRestaurant = async () => {
    try {
      const response = await axios.get('http://localhost:8081/management/restaurant/'+id);
      setRestaurant(response.data);
      console.log(restaurant);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(true);
    }
  };
  if(!error && restaurant == null){
  fetchRestaurant();
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8081/management/category/categories/'+id);
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
      <h3>{restaurant == null ? null : restaurant.name}</h3>
      <h5>      <img src={whatsapp == null  ? whatsapp: whatsapp} className="whatsapp" alt='whatsapp' />
 {restaurant == null ? null : restaurant.phone}</h5>

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

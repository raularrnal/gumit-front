// src/components/CategoryList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import { useParams } from 'react-router-dom';
import whatsapp from '../img/icons8-whatsapp-50.png'
import instagram from '../img/icons8-instagram-50.png'
import AdminMenu from './AdminMenuPrincipal';



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
 /**
  *     {restaurant != null  && <div className='rss-container'> 
     { restaurant.phone && restaurant.phone !== null && <a href={`https://wa.me/${restaurant.phone}`} target="_blank">
   <img src={whatsapp == null  ? whatsapp: whatsapp} className="whatsapp" alt='whatsapp' /> </a> }
   
   {restaurant.instagram &&   restaurant.instagram !== null && (
      <a href={`https://www.instagram.com/${restaurant.instagram}`} target="_blank">
        <img src={instagram} alt="Instagram"  className="whatsapp"  />
      </a>
    )}
</div>} 
  */
  return (
    <div>

      <div class="title-container">
        <h3 class="banner-title">{restaurant == null ? null : restaurant.name}</h3>
    </div>

     
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

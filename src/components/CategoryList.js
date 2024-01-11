// src/components/CategoryList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import { useParams } from 'react-router-dom';
import whatsapp from '../img/icons8-whatsapp-50.png'
import instagram from '../img/icons8-instagram-50.png'
import AdminMenu from './AdminMenuPrincipal';



const CategoryList = ( {categoryList}) => {
  const [productList, setProductList] = useState([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);




  const handleCategoryClick =  ({category}) => {
    setSelectedCategoryId(category.id);
    setProductList(category.productList);
  };

  return (
    <div>     
      <ul className="category-list">
        {categoryList.map( (category) => (
          <li
            key={category.id}
            className={selectedCategoryId === category.id ? 'selected' : ''}
            onClick={() => handleCategoryClick({category})}
          >
            {category.description}
          </li>
        ))}
      </ul>
      {selectedCategoryId && <ProductList productList={productList} />}
    </div>
  );
};

export default CategoryList;

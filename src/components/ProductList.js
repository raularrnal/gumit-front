// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ categoryId }) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/management/product/products/${categoryId}`);
        setProductList(response.data.productList);
      } catch (error) {
        console.error(`Error fetching products for category ${categoryId}:`, error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div>
      <ul className="product-list">
        {productList.map(product => (
          <li key={product.id} className="product-item">
            <div className="product-info">
              <p>{product.description}</p>
              <div className="price-circle">
                <span>{product.price} €</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

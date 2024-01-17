// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../img/wine-svgrepo-com.svg';
//import logo from 'https://front.gumithuesca.com/img/chatgptimggumit.png'
import { useParams } from 'react-router-dom';

const ProductList = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://back.gumithuesca.com/management/product/${productId}`);
        setProductList(response.data.productList);
      } catch (error) {
        console.error(`Error fetching products for category ${productId}:`, error);
      }
    };

    fetchProducts();
  }, [productId]);



  

  return (
    <div>
        {productList.map(product => (
          <div key={product.id} className="product-item">
        <img src={product.image == null  ? logo: product.image} className="card-img-top" alt={`Imagen de ${product.name}`} />

            <div className="product-info">
              <p>{product.name}</p>
              <div className="price-circle-menu">
                <span>{product.price} €</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductList;

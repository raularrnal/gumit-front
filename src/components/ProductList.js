// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../img/wine-svgrepo-com.svg';
import Popup from './Popup.js'

const ProductList = ({ categoryId }) => {
  const [productList, setProductList] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const showPopup = (product) => {
    setSelectedProduct(product);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setSelectedProduct(null);
    setPopupVisible(false);
  };

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
      <ul className='list-flex'>
        {productList.map(product => (
          <li key={product.id} className="product-item"  onClick={() => showPopup(product)}> 
        <img src={product.image == null  ? logo: product.image} className="card-img-top" alt={`Imagen de ${product.name}`} />

            <div className="product-info">
              <p>{product.name}</p>
              <div className="price-circle">
                <span>{product.price} €</span>
              </div>
            </div>
          </li>
        ))}

{popupVisible && (
        <Popup
          src={selectedProduct.image == null ? logo : selectedProduct.image}
          description={selectedProduct.description}
          price={selectedProduct.price}
          allergenList={selectedProduct.allergentList}
          onClose={closePopup}
        />
      )}
      </ul>
    </div>
  );
};

export default ProductList;

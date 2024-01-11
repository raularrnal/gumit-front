import React, { useState } from 'react';
import logo from '../img/wine-svgrepo-com.svg';
import Popup from './Popup.js';

const ProductList = ({ productList }) => {
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

  return (
    <div>
      <ul className='list-flex'>
        {productList && productList.map(product => (
          <li key={product.id} className="product-item" onClick={() => showPopup(product)}>
            <img src={product.image == null ? logo : product.image} className="card-img-top" alt={`Imagen de ${product.name}`} />

            <div className="product-info">
              <p>{product.name}</p>
              <div className="price-circle">
                <span>{product.price} €</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {popupVisible && (
        <Popup
          
          src={selectedProduct.image == null ? logo : selectedProduct.image}
          description={selectedProduct.description}
          price={selectedProduct.price}
          allergenList={selectedProduct.allergentProductList}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default ProductList;

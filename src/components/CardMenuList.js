// src/components/CategoryList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import { useParams } from 'react-router-dom';
import recoger from '../img/icons8-adicto-a-las-compras-94.png'
import pedir from '../img/icons8-moto-100.png'
import whatsapp from '../img/icons8-whatsapp-64-nuevo.png'
import pan from '../img/icons8-pan-60.png'
import AdminMenu from './AdminMenuPrincipal';



const CardMenuList = ({ menuList}) => {

  return (
    <div>     
        {
          menuList.map( menu => (  
            <div className="menu-item" ><img src={pan}  alt='pan' />
              <h3>{menu.name}</h3>
              {menu.menuPriceList.map(menuPrice => ( 
                <div className="product-info"> 
                  <p>{menuPrice.description}</p>
                  <div className="price-circle-menu">
                     <span>{menuPrice.price} €</span>
                   </div>
                </div>
              ))}
            </div>
          ))
        }
      


    </div>
  );
};

export default CardMenuList;

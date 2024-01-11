// src/components/CategoryList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import { useParams } from 'react-router-dom';
import recoger from '../img/icons8-adicto-a-las-compras-94.png'
import pedir from '../img/icons8-moto-100.png'
import whatsapp from '../img/icons8-whatsapp-64-nuevo.png'
import insta from '../img/icons8-instagram-100.png'
import AdminMenu from './AdminMenuPrincipal';



const RestaurantAdditionalInfo = ({takeAway , isdelivery ,whatsappOrder, whatsappNumber,instragramAccount }) => {

  return (
    <div>     

        { takeAway  && <div className='infoBox'>
        <p className="infoText">¡Disponible para Take Away!          
</p>
<img src={recoger} alt='pedir' />
        </div>}
        { isdelivery  && <div className='infoBox'>
          <p className="infoText">¡Disponible para Delivery!</p>
          <img src={pedir}  alt='pedir' />
        </div>}
        { whatsappOrder  && <div className='infoBox'>
          <p className="infoText">¡Disponible pedido por WhatsApp!         
</p>
<a href={`https://wa.me/${whatsappNumber}`} target="_blank"><img src={whatsapp}  alt='pedir' /></a>
        </div>}

        { instragramAccount  &&  instragramAccount != null && <div className='infoBox'>
          <p className="infoText">¡Pasate por nuestras redes!         
</p>
<a href={`https://www.instagram.com/${instragramAccount}`} target="_blank"><img src={insta}  alt='pedir' /></a>
        </div>}
    </div>
  );
};

export default RestaurantAdditionalInfo;
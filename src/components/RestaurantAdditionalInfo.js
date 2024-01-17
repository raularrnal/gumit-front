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



const RestaurantAdditionalInfo = ({takeAway , isdelivery ,whatsappOrder, whatsappNumber,instragramAccount, address, city }) => {

  return (
    <div>     

        { takeAway  && <div className='infoBox'>
<img src={recoger} alt='pedir' />
<p className="infoText">¡Disponible para Take Away!</p>      
        </div>}
        { isdelivery  && <div className='infoBox'>
          <img src={pedir}  alt='pedir' />
          <p className="infoText">¡Disponible para Delivery!</p>
        </div>}
        { whatsappOrder  && <div className='infoBox'>
<a href={`https://wa.me/${whatsappNumber}`} target="_blank"><img src={whatsapp}  alt='pedir' /></a>
<p className="infoText">¡Disponible pedido por WhatsApp!</p>   
        </div>}

        { instragramAccount  &&  instragramAccount != null && <div className='infoBox'>
<a href={`https://www.instagram.com/${instragramAccount}`} target="_blank"><img src={insta}  alt='pedir' /></a>
<p className="infoText">¡Pasate por nuestras redes!</p>       
</div>
        
        }
<div className='infoBoxIframe'>
        <iframe
            width="100%"
            height="100%"
            frameborder="0" style={{border:0}}
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDcCm6mBFcAVs0lp-6xboASN9IrU4HLvrY&q=${address},${city},ESPAÑA`}>
  </iframe>
</div>
    </div>
  );
};

export default RestaurantAdditionalInfo;

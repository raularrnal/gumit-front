// src/components/CategoryList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Restaurants.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import logo from '../img/wine-svgrepo-com.svg';

const Restaurants = () => {
  const [restaurantList, setRestaurantsList] = useState([]);
  const [selectedrestaurantId, setSelectedRestaurantId] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('https://back.gumithuesca.com/management/restaurant/restaurants');
        setRestaurantsList(response.data.restaurantList);
      } catch (error) {
        console.error('Error fetching restaurantList:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleRestaurantClick = (restaurantId) => {
   console.log("direccion categorias");

   
  };

  return (
    <div className="container">
      <ul className="list-flex">
        {restaurantList.map((restaurant) => (
         <Link to={`/carta/${restaurant.id}`} className="admin-menu-item-first">  <li key={restaurant.id} className="restaurant-item">
            <div className="card" style={{  marginBottom: '20px', transition: 'transform 0.3s ease-in-out' }}>
             
              <img src={restaurant.logo == null  ? logo: restaurant.logo} className="card-img-top" alt={`Imagen de ${restaurant.name}`} />
              <div className="card-body-custom" style = {{background: '#d4aa8a' }}>
                <h5 className="card-title" style = {{padding: '10px' , color : 'white'}}>{restaurant.name}</h5>
                <p className="card-text" style = {{color : 'white'}}>{restaurant.description}</p>

              </div>
            </div>
          </li></Link>
        ))}
      </ul>
    </div>);
};

export default Restaurants;

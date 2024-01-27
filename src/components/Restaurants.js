import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Restaurants.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import logo from '../img/wine-svgrepo-com.svg';

const Restaurants = () => {
  const [restaurantList, setRestaurantsList] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTakeAway, setIsTakeAway] = useState(true);
  const [isDelivery, setIsDelivery] = useState(true);
  const [isWhatsappOrder, setIsWhatsappOrder] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('https://back.gumithuesca.com/management/restaurant/elastic?name=*');
        setRestaurantsList(response.data.restaurantSearchList);
        setFilteredRestaurants(response.data.restaurantSearchList);
      } catch (error) {
        console.error('Error fetching restaurantList:', error);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    const results = restaurantList.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      ((isTakeAway && restaurant.takeAway) ||  (!isTakeAway && !restaurant.takeAway)) 
      &&
      ((isDelivery && restaurant.isdelivery) || (!isDelivery && !restaurant.isdelivery))
      &&
      ((isWhatsappOrder && restaurant.whatsappOrder) ||       (!isWhatsappOrder && !restaurant.whatsappOrder))

    );
    setFilteredRestaurants(results);
  }, [searchTerm, isTakeAway, isDelivery, isWhatsappOrder, restaurantList]);

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Buscar restaurante..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

<div className="checkbox-filters">
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="takeaway"
            checked={isTakeAway}
            onChange={(e) => setIsTakeAway(e.target.checked)}
          />
          <label htmlFor="takeaway" className="checkbox-label">Take Away</label>
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="delivery"
            checked={isDelivery}
            onChange={(e) => setIsDelivery(e.target.checked)}
          />
          <label htmlFor="delivery" className="checkbox-label">Delivery</label>
        </div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="whatsappOrder"
            checked={isWhatsappOrder}
            onChange={(e) => setIsWhatsappOrder(e.target.checked)}
          />
          <label htmlFor="whatsappOrder" className="checkbox-label">Whatsapp Order</label>
        </div>
      </div>

      <ul className="list-flex">
        {filteredRestaurants.map((restaurant) => (
          <Link to={`/carta/${restaurant.id}`} className="admin-menu-item-first">  
            <li key={restaurant.id} className="restaurant-item">
              <div className="card" style={{ marginBottom: '20px', transition: 'transform 0.3s ease-in-out' }}>
                <img src={restaurant.logo == null ? logo : restaurant.logo} className="card-img-top" alt={`Imagen de ${restaurant.name}`} />
                <div className="card-body-custom" style={{ background: '#d4aa8a', boxShadow: 'initial' }}>
                  <h5 className="card-title" style={{ padding: '10px', color: 'white' }}>{restaurant.name}</h5>
                  <p className="card-text" style={{ color: 'white' }}>{restaurant.description}</p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Restaurants;

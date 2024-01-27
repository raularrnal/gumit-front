import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/AdminMenu.css';
import CategoryList from './CategoryList';
import axios from 'axios';
import cartaImg from '../img/icons8-menú-64.png';
//import cartaImg from '../img/ICONOS GUMIT/1.png';
import loading from '../img/icons8-carga-de-puntos.gif';
import menuImg from '../img/icons8-menu-board-96.png';
import informacionImg from '../img/icons8-restaurante--48.png';
//import informacionImg from '../img/ICONOS GUMIT/2.png';
import RestaurantAdditionalInfo from './RestaurantAdditionalInfo';
import CardMenuList from './CardMenuList';

const AdminMenuPrincipal = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('additional_info');
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para indicar si está cargando
  const [error, setError] = useState(false);

  const { id } = useParams();

  const fetchRestaurant = async () => {
    try {
      const response = await axios.get(`https://back.gumithuesca.com/management/restaurant/${id}`);
      setRestaurant(response.data);
      setIsLoading(false); // Cuando se completa la carga, establece isLoading en falso
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setError(true);
      setIsLoading(false); // En caso de error, también establece isLoading en falso
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!restaurant) {
        setIsLoading(true);
        await fetchRestaurant();
      }
    };
  
    fetchData();
  }, [restaurant, id]);

  const mostrarContenido = () => {
    if (isLoading) {
      return (     
        <div   className='loadingBox' >    
      <img
      src={loading}
      alt="GIF LOADING"
    /></div>)
      ; // Puedes reemplazar esto con tu propio indicador de carga
    }

    if (error) {
      return <p>Ocurrió un error al cargar el restaurante.</p>; // Manejo de errores
    }


    switch (opcionSeleccionada) {
      case 'carta':
        return <CategoryList categoryList={restaurant.categoryList} />;
      case 'additional_info':
        return (
          <RestaurantAdditionalInfo
            instragramAccount={restaurant.instragramAccount}
            takeAway={restaurant.takeAway}
            isdelivery={restaurant.isdelivery}
            whatsappOrder={restaurant.whatsappOrder}
            whatsappNumber={restaurant.whatsappNumber}
            address={restaurant.address}
            city={restaurant.city}
          />
        );
    //  case 'menu':
      //  return <CardMenuList menuList={restaurant.menuList} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="title-container">
        <h3 className="banner-title">{restaurant == null ? null : restaurant.name}</h3>
      </div>

      <ul className="menu-list">
        <li  onClick={() => setOpcionSeleccionada('carta')}>
          <img src={cartaImg} className="carta-img" alt="carta" />
        </li>
        <li onClick={() => setOpcionSeleccionada('additional_info')}>
          <img src={informacionImg} className="carta-img" alt="Informacion" />
        </li>
      </ul>

      {mostrarContenido()}
    </div>
  );
};

export default AdminMenuPrincipal;

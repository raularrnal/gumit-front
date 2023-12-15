// Popup.js
import React from 'react';
import '../css/Popup.css'; // Asegúrate de tener estilos CSS adecuados

const Popup = ({ src, description, price, allergenList,onClose }) => {

  
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <img className='product-pic' src={src} alt={`Imagen de ${description}`} />
        <p>{description}</p>
        <p>{price} €</p>
        <ul className='flex-list'>
          <li>
        { allergenList != null ? allergenList.map( allergen => ( 
        <img className='allergens-pic'
        src={require(`../img/alergenos/${allergen.imgPath}`)}
        alt={`Imagen de ${allergen.imgPath}`}
      />
        
        )) : null}</li>
        </ul>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Popup;

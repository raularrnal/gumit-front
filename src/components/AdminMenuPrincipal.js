// AdminMenu.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/AdminMenu.css'; // Importa el archivo CSS

const AdminMenuPrincipal = () => {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('carta');

  const mostrarContenido = () => {
    switch (opcionSeleccionada) {
      case 'carta':
        return <CategoriaMenu />;
      case 'menu':
        return <MenuCarta />;
      case 'informacion':
        return <InformacionRestaurante />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Menú de opciones */}
      <div>
        <button onClick={() => setOpcionSeleccionada('carta')}>Carta</button>
        <button onClick={() => setOpcionSeleccionada('menu')}>Menú</button>
        <button onClick={() => setOpcionSeleccionada('informacion')}>Información</button>
      </div>

      {/* Contenido dinámico según la opción seleccionada */}
      {mostrarContenido()}
    </div>
  );
};


export default AdminMenuPrincipal;

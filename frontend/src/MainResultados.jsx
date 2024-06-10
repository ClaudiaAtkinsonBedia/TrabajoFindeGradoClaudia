// Importamos las cosas que necesitamos importar
import React from 'react';
import { Link } from 'react-router-dom';

// Definimos el componente MainResultados
// Recibe una propiedad `results` que es un array de resultados de búsqueda
function MainResultados({ results }) {
  // Si no hay resultados, no mostramos nada
  if (results.length === 0) {
    return null; // Cuando retorna null significa que el componente no ha renderizado nada
  }

  return (
    // Si hay resultados, renderizamos un contenedor para los resultados de búsqueda
    <div className="search-results">
      <ul>
        {/* Mapeamos sobre el array de resultados y renderizamos un elemento <li> por cada resultado */}
        {results.map((item) => (
          <li key={item.id}>
            {/* Cada resultado es un enlace que navega a una ruta basada en el ID del elemento */}
            <Link to={`/item/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainResultados; // Exportamos el componente para poder usarlo en otros archivos


import React from 'react';
import { Link } from 'react-router-dom';

function MainResultados({ results }) {
  if (results.length === 0) {
    return null; // No mostrar nada si no hay resultados
  }

  return (
    <div className="search-results">
      <ul>
        {results.map((item) => (
          <li key={item.id}>
            <Link to={`/item/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainResultados;


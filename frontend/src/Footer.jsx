// Importamos las cosas que necesitamos importar
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { dataES } from './dataES';
import MainResultados from './MainResultados.jsx';

function Footer() {
    // Definimos los estados para la búsqueda
    const [searchQuery, setSearch] = useState(''); // Estado para el texto de búsqueda
    const [searchResults, setSearchResults] = useState([]); // Estado para los resultados de la búsqueda
    const [showResults, setShowResults] = useState(false); // Estado para mostrar u ocultar los resultados

    const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    
    if (query) {
    // filtramos los datos según la búsqueda
      const results = dataES.filter(item => item.name && item.name.toLowerCase().includes(query.toLowerCase())); // dataES es el JSON en español
      setSearchResults(results);  // Actualizamos el estado de los resultados de búsqueda
      setShowResults(true); // Mostramos los resultados
      focus(setSearchResults);
    } else {
      setShowResults(false); // Ocultamos los resultados si no hay consulta
    }
  };

    // Con esto manejamos el envío del formulario de búsqueda  
    const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    
    // Filtramos los resultados basados en la consulta de búsqueda
    const results = data.filter(item => item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase()));  // dataES es el JSON en español
    setSearchResults(results); // Actualizamos el estado de los resultados de búsqueda
    setShowResults(true); // Mostramos los resultados
  };

    return (    
        <footer>
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    {/* Columna 1: Mapa del sitio */}
                    <h6 className="text-center">MAPA DEL SITIO</h6>
                    <ul className="pt-3 list-unstyled">
                        <li><Link to="/" className='no-underline'>Inicio</Link></li>
                        <li><Link to="/register" className='no-underline'>Hazte una cuenta</Link></li>
                        <li>
                            <form className="d-flex" onSubmit={handleSubmit}>
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Descubre..."
                                    aria-label="Search"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                                <button className="btn btn-outline-primary" type="submit">Buscar</button>
                            </form>
                        </li>
                        <li><Link to="/contacto" className='no-underline'>Contacto</Link></li>
                        <li><Link to="/login" className='no-underline'>Iniciar sesión</Link></li>
                    </ul>
                </div>
                {/* Columna 2: Información */}
                <div className="col-lg-4">
                    <h6 className="text-center">INFORMACIÓN</h6>
                    <ul className="pt-3 list-unstyled">
                        <li>Aviso Legal</li>
                        <li>Política de Cookies</li>
                        <li>Política de Privacidad</li>
                    </ul>
                </div>
                {/* Columna 3: Contacto */}
                <div className="col-lg-4">
                    <h6 className="text-center">CONTACTO</h6>
                    <ul className="pt-3 list-unstyled">
                        <li><Link to="/contacto" className='no-underline'>Contacta con nosotros</Link></li>
                        <li>AQUÍ LOS ICONOS</li> {/* Placeholder para los iconos de redes sociales */}
                    </ul>
                </div>
            </div>
        </div>
        {/* Muestra los resultados de búsqueda si hay resultados */}
        {showResults && <MainResultados results={searchResults} />}
    </footer>
    );
}

export default Footer;
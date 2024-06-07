import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { dataES } from './dataES';
import MainResultados from './MainResultados.jsx';

function Footer() {
    const [searchQuery, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    
    if (query) {
      const results = dataES.filter(item => item.name && item.name.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(results);
      setShowResults(true);
      focus(setSearchResults);
    } else {
      setShowResults(false);
    }
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    
    const results = data.filter(item => item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setSearchResults(results);
    setShowResults(true);
  };

    return (    
        <footer>
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    <h6 className="text-center">MAPA DEL SITIO</h6>
                    <ul className="pt-3">
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/register">Hazte una cuenta</Link></li>
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
                        <li><Link to="/contacto">Contacto</Link></li>
                        <li><Link to="/login">Iniciar sesión</Link></li>
                    </ul>
                </div>
                <div className="col-lg-4">
                    <h6 className="text-center">INFORMACIÓN</h6>
                    <ul className="pt-3">
                        <li>Aviso Legal</li>
                        <li>Política de Cookies</li>
                        <li>Política de Privacidad</li>
                    </ul>
                </div>
                <div className="col-lg-4">
                    <h6 className="text-center">CONTACTO</h6>
                    <ul className="pt-3">
                        <li><Link to="/contacto">Contacta con nosotros</Link></li>
                        <li>AQUÍ LOS ICONOS</li>
                    </ul>
                </div>
            </div>
        </div>
        {showResults && <MainResultados results={searchResults} />}
    </footer>
    );
}

export default Footer;

/* POR QUÉ HAY DOS FOOTERS, PENSAR */ 
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './img/logoSYT.png';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Búsqueda realizada:', searchQuery);
  };

  return (
    <header>
      <div className="container">
        <div className="row justify-content-between align-items-center">

          <div className="col d-none d-lg-block text-center">
          <Link to="/login"><i className="bi bi-person-circle"></i>
            Iniciar sesión</Link>
          </div>

          <div className="col-lg-auto text-center">
            <Link to="/"><img className="d-flex d-none d-lg-block logoEscritorio mx-auto" src={logo} alt="Logo de Share your tale"></img></Link>
          </div>

          <div className="col d-none d-lg-block text-center">
            <p>ES</p>
            |
            <p>EN</p>
          </div>

        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed">
        <div className="container">

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <i className="bi bi-list"></i>
          </button>
          <div className="col d-lg-none">
            <Link to="/"><img className="mx-auto d-flex d-block d-lg-none text-center logoMovil" src={logo} alt="Logo de Share your tale"></img></Link>
          </div>

          <div className="d-lg-none text-center">
            <div>
              <p>ES</p>
              |
              <p>EN</p>
            </div>
            <div>
              <Link to="/login">Iniciar sesión</Link>
            </div>
          </div>

          <div className="collapse navbar-collapse barraDeNavegacion" id="navbarNavDropdown">
            <ul className="navbar-nav mx-lg-auto align-items-lg-center">
              <li className="nav-item dropdown m-lg-4">
                <li className="nav-item">
                  <Link to="/" className="nav-link active m-lg-4">Inicio</Link>
                </li>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link active m-lg-4" aria-current="page">Hazte una cuenta</Link>
              </li>
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
              <li className="nav-item">
                <Link to="/contacto" className="nav-link m-lg-4">Contacto</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
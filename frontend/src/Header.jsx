import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './img/logoSYT.png';
import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { dataES } from './dataES';
import MainResultados from './MainResultados.jsx';
import { AuthContext } from './AuthContext.jsx';

function Header() {
  const [searchQuery, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const { token, userRole, username, logout } = useContext(AuthContext);

  const botonSwitch = () => {
    switch (userRole) {
      case 'administrador':
        return '/admin';
      case 'escritor':
        return '/escritor';
      case 'lector':
        return '/lector';
      case 'editor':
        return '/editor';
      default:
        return '/';
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query) {
      const results = dataES.filter(item => item.name && item.name.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = dataES.filter(item => item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setSearchResults(results);
    setShowResults(true);
  };

  return (
    <header>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col d-none d-lg-block text-center">
            {token ? (
              <>
                <Link to={botonSwitch()}>Cuenta de {username}</Link>
                <button onClick={logout}>Cerrar sesión</button>
              </>
            ) : (
              <Link to="/login"><i className="bi bi-person-circle"></i> Iniciar sesión</Link>
            )}
          </div>
          <div className="col-lg-auto text-center">
            <Link to="/"><img className="d-flex d-none d-lg-block logoEscritorio mx-auto" src={logo} alt="Logo de Share your tale"></img></Link>
          </div>
          <div className="col d-none d-lg-block text-center">
            <p>ES</p> | <p>EN</p>
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
              <p>ES</p> | <p>EN</p>
            </div>
            <div>
              <Link to="/login">Iniciar sesión</Link>
            </div>
          </div>
          <div className="collapse navbar-collapse barraDeNavegacion" id="navbarNavDropdown">
            <ul className="navbar-nav mx-lg-auto align-items-lg-center">
              <li className="nav-item">
                <Link to="/" className="nav-link active m-lg-4">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link active m-lg-4" aria-current="page">Hazte una cuenta</Link>
              </li>
              <li className="nav-item">
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
      {showResults && <MainResultados results={searchResults} />}
    </header>
  );
}

export default Header;
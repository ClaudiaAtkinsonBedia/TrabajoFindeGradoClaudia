// Importamos las cosas que necesitamos importar
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './img/logoSYT.png';
import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { dataES } from './dataES';
import MainResultados from './MainResultados.jsx';
import { AuthContext } from './AuthContext.jsx';

function Header() {
  //Definimos los estados para la búsqueda
  const [searchQuery, setSearch] = useState(''); // Estado para el texto de búsqueda
  const [searchResults, setSearchResults] = useState([]); // Estado para los resultados de la búsqueda
  const [showResults, setShowResults] = useState(false); // Estado para mostrar u ocultar los resultados
  const [isNavCollapsed, setIsNavCollapsed] = useState(true); // Estado para el colapso del navbar

  // Extraemos el token, el rol de usuario, el nombre de usuario y la función del logout del contento de autenticación 
  const { token, userRole, username, logout } = useContext(AuthContext);

  // La función para determinar la ruta según el rol de usuario
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

  // Con esto manejamos los cambios en el campo de búsqueda
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query) {
      // filtramos los datos según la búsqueda
      const results = dataES.filter(item => item.name && item.name.toLowerCase().includes(query.toLowerCase())); // dataES es el JSON en español
      setSearchResults(results); // Actualizamos el estado de los resultados de búsqueda
      setShowResults(true); // Mostramos los resultados
    } else {
      setShowResults(false); // Ocultamos los resultados si no hay consulta
    }
  };

  // Con esto manejamos el envío del formulario de búsqueda
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    // Filtramos los resultados basados en la consulta de búsqueda
    const results = dataES.filter(item => item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())); // dataES es el JSON en español
    setSearchResults(results); // Actualizamos el estado de los resultados de búsqueda
    setShowResults(true); // Mostramos los resultados
  };

  const funcionBajarMenu = () => {
    setIsNavCollapsed(!isNavCollapsed);
  }

  return (
    <header className="header sticky-top">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col d-none d-lg-block text-center">
          </div>
          <div className="col-lg-auto text-center">
            {/* Muestra el logo */}
            <Link to="/"><img className="d-flex d-none d-lg-block logoEscritorio mx-auto" src={logo} alt="Logo de Share your tale"></img></Link>
          </div>
          <div className="col d-none d-lg-block text-center">
          {token ? (
              <>
              {/* Muestra enlace a la cuenta del usuario si está autenticado */}
              <div className='row'>
                <div className='col-12'>
                  <Link to={botonSwitch()} className='no-underline'>Cuenta de {username}</Link>
                </div>
                <div className='col-12 pt-3'>
                  <button className="btn" id='button' onClick={logout}>Cerrar sesión</button>
                </div>
              </div>
              </>
            ) : (
              // Muestra enlace para iniciar sesión si no está autenticado
              <Link to="/login" id='link' className='no-underline'><i className="bi bi-person-circle"></i> Iniciar sesión</Link>
            )}
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Botón para expandir el menú en móviles */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded={!isNavCollapsed} aria-label="Toggle navigation" onClick={funcionBajarMenu}>
            <i className="bi bi-list"></i>
          </button>
          <div className="col d-lg-none">
             {/* Muestra el logo en móviles */}
            <Link to="/"><img className="mx-auto d-flex d-block d-lg-none text-center logoMovil" src={logo} alt="Logo de Share your tale"></img></Link>
          </div>
          <div className="d-lg-none text-center">
            <div>
            </div>
            <div>
            {token ? (
              <>
              {/* Muestra enlace a la cuenta del usuario si está autenticado en móviles*/}
              <div>
              <div className='col-12'>
                <Link to={botonSwitch()}className='no-underline'>Cuenta de {username}</Link>
                </div>
                <div className='col-12 pt-3'>
                  <button className="btn" id='button' onClick={logout}>Cerrar sesión</button>
                </div>
              </div>
              </>
            ) : (
              // Muestra enlace para iniciar sesión si no está autenticado en móviles
              <Link to="/login" id='link' className='no-underline'><i className="bi bi-person-circle"></i> Iniciar sesión</Link>
            )}
            </div>
          </div>
          <div className={`${isNavCollapsed ? 'collapse' : 'show'} navbar-collapse barraDeNavegacion`} id="navbarNavDropdown">
            <ul className="navbar-nav mx-lg-auto align-items-lg-center">
              <li className="nav-item">
                {/* Enlace a la página de inicio */}
                <Link to="/" className="nav-link active m-lg-4">Inicio</Link>
              </li>
              <li className="nav-item">
                {/* Enlace a la página de registro */}
                <Link to="/register" className="nav-link active m-lg-4">Hazte una cuenta</Link>
              </li>
              <li className="nav-item">
                {/* Formulario de búsqueda */}
                <form className="d-flex" onSubmit={handleSubmit}>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Descubre..."
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="btn" id='button' type="submit">Buscar</button>
                </form>
              </li>
              <li className="nav-item">
                {/* Enlace a la página de contacto */}
                <Link to="/contacto" className="nav-link m-lg-4">Contacto</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Muestra los resultados de búsqueda si hay resultados */}
      {showResults && <MainResultados results={searchResults} />}
    </header>
  );
}

export default Header;
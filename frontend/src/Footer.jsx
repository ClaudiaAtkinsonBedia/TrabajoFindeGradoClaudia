import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Búsqueda realizada:', searchQuery);
    };

    return (    
    <footer>
        <div className="container d-none d-lg-block">
            <div className="row">
                <div className="col">
                    <h6 className="text-center">MAPA DEL SITIO</h6>
                        <ul className="pt-3">
                            <li>
                                <Link to="/">Inicio</Link>
                            </li>
                                    <li><Link to="/iniciarSesion">Hazte una cuenta</Link></li>
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
                                <li><Link to="/iniciarSesion">Iniciar sesión</Link></li>
                        </ul>
                </div>
                <div className="col ps-5 border border-bottom-0 border-end-0 border-top-0 border-dark">
                    <h6 className="text-center">INFORMACIÓN</h6>
                        <ul className="pt-3">
                            <li>Aviso Legal</li>
                            <li>Política de Cookies</li>
                            <li>Política de Privacidad</li>
                        </ul>
                </div>

                <div className="col ps-5 border border-bottom-0 border-end-0 border-top-0 border-dark">
                    <h6 className="text-center"> CONTACTO </h6>
                        <ul className="pt-3">
                            <li>
                                <Link to="/contacto">Contacta con nosotros</Link>
                            </li>
                            <li>
                                AQUÍ LOS ICONOS
                            </li>
                        </ul>
                </div>
                </div>
                </div>

                <div className="container d-lg-none">
                <div className="row">
                <div className="col-12 pt-3 d-flex flex-column align-items-center border border-start-0 border-end-0 border-top-0 border-dark">
                    <h6>MAPA DEL SITIO</h6>
                        <ul className="d-flex flex-column">
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/iniciarSesion">Hazte una cuenta</Link></li>
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
                                <li><Link to="/iniciarSesion">Iniciar sesión</Link></li>
                        </ul>
                </div>
    
                <div className="col-12 pt-3 d-flex flex-column align-items-center border border-start-0 border-end-0 border-top-0 border-dark">
                    <h6>INFORMACIÓN</h6>
                        <ul className="d-flex flex-column">
                            <li>Aviso Legal</li>
                            <li>Política de Cookies</li>
                            <li>Política de Privacidad</li>
                        </ul>
                </div>

                <div className="col-12 pt-3 d-flex flex-column align-items-center border border-bottom-0 border-start-0 border-end-0 border-top-0 border-dark">
                    <h6>CONTACTO</h6>
                        <ul className="d-flex flex-column">
                            <li>
                                <Link to="/contacto">Contacta con nosotros</Link>
                            </li>
                            <li>
                                AQUÍ LOS ICONOS
                            </li>
                        </ul>
                </div>
            </div>
        </div>
    </footer>
    );
}

export default Footer;
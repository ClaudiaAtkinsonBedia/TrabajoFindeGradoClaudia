import React from 'react';

function MainAdmin() {
    return (
        <div className="container">
            <div className="row">
                <h2 className="justify-items-center text-center">Menú de Administrador</h2>
                <aside id="sidebar"> 
                    <div className="sidebar-title">
                        <div className="sidebar-brand d-flex justify-items-between">
                            <h5 className="mx-2">Ajustes</h5><i className="bi bi-gear icon_header"></i>
                        </div>
                        <span className="icon close_icon">X</span>
                    </div>

                    <ul className="sidebar-list">
                        <li className="sidebar-list-item">
                            <i className="bi bi-person-gear icon"></i>ALGO
                        </li>
                        <li className="sidebar-list-item">
                            <i className="bi bi-person-gear icon"></i>ALGO
                        </li>
                        <li className="sidebar-list-item">
                            <i className="bi bi-person-gear icon"></i>ALGO
                        </li>
                        <li className="sidebar-list-item">
                            <i className="bi bi-person-gear icon"></i>ALGO
                        </li>
                        <li className="sidebar-list-item">
                            <i className="bi bi-person-gear icon"></i>ALGO
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
    );
}

export default MainAdmin;
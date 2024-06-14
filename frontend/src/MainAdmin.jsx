import { useState } from "react";

function MainAdmin() {
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div>
      <button className={`sidebar-toggle ${sidebarActive ? 'active' : ''}`} onClick={toggleSidebar}>
        <i className="bi bi-list"></i>
      </button>
      <aside id="sidebar" className={sidebarActive ? 'active' : ''}>
        <div className="sidebar-title">
          <div className="sidebar-brand d-flex justify-content-between">
            <h5 className="mx-2">Ajustes</h5><i className="bi bi-gear icon_header"></i>
          </div>
          <span className="icon close_icon" onClick={toggleSidebar}>X</span>
        </div>
        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <i className="bi bi-person-gear icon"></i>Cambiar tipo de cuenta
          </li>
          <li className="sidebar-list-item">
            <i className="bi bi-person-gear icon"></i>Ajustes de cuenta
          </li>
          <li className="sidebar-list-item">
            <i className="bi bi-person-gear icon"></i>Borrar cuenta
          </li>
        </ul>
      </aside>
      <div className="container main-content">
        <h2 className="justify-items-center text-center">Menú de Administrador</h2>
      </div>
    </div>
  );
}

export default MainAdmin;

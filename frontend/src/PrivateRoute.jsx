import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext.jsx';

const PrivateRoute = ({ children, roles }) => {
  const { userRole } = useContext(AuthContext);

  if (!userRole) {
    // Si no hay un rol definido, redirige a la página de inicio de sesión
    return <Navigate to="/login" />;
  }

  // Verificamos si el rol del usuario está en la lista de roles permitidos
  if (!roles.includes(userRole)) {
    // Redirige a la página de inicio si el usuario no tiene acceso
    return <Navigate to="/" />;
  }

  // Renderiza el componente hijo si el usuario tiene acceso
  return children;
};

export default PrivateRoute;
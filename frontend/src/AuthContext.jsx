// Importamos las cosas que necesitamos importar
import React, { createContext, useState, useEffect } from 'react';

// Crea un contexto de autenticación
export const AuthContext = createContext();

// Proveedor de contexto de autenticación
export const AuthProvider = ({ children }) => {
    // Estado para almacenar el token, el rol del usuario y el nombre de usuario
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
    const [username, setUsername] = useState(localStorage.getItem('username') || '');

    // Efecto para ejecutar código cuando el componente se monta o el nombre de usuario cambia
    useEffect(() => {
        console.log("AuthProvider mounted");
        console.log("Current username:", username);
    }, [username]);

    // Función para manejar el inicio de sesión
    const login = (newToken, role, user) => {
        setToken(newToken); // Actualiza el estado del token
        setUserRole(role); // Actualiza el estado del rol del usuario
        setUsername(user); // Actualiza el estado del nombre de usuario
        // Guarda los datos en localStorage
        localStorage.setItem('token', newToken);
        localStorage.setItem('userRole', role);
        localStorage.setItem('username', user);
        console.log("Logged in as:", user, "with role:", role);
    };

    // Función para manejar el cierre de sesión
    const logout = () => {
        setToken(''); // Limpia el estado del token
        setUserRole(''); // Limpia el estado del rol del usuario
        setUsername(''); // Limpia el estado del nombre de usuario
        // Elimina los datos de localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('username');
    };

    // Proveedor del contexto que envuelve los componentes hijos
    return (
        <AuthContext.Provider value={{ token, userRole, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

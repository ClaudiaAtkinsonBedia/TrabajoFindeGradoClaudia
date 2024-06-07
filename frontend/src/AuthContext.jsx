import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
    const [username, setUsername] = useState(localStorage.getItem('username') || '');

    useEffect(() => {
        console.log("AuthProvider mounted");
        console.log("Current username:", username);
    }, [username]);

    const login = (newToken, role, user) => {
        setToken(newToken);
        setUserRole(role);
        setUsername(user);
        localStorage.setItem('token', newToken);
        localStorage.setItem('userRole', role);
        localStorage.setItem('username', user);
        console.log("Logged in as:", user, "with role:", role);
    };

    const logout = () => {
        setToken('');
        setUserRole('');
        setUsername('');
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('username');
    };

    return (
        <AuthContext.Provider value={{ token, userRole, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

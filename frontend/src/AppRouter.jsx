import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import MainInicio from './MainInicio.jsx';
import MainContacto from './MainContacto.jsx';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Login from "./components/Login";
import Register from "./components/Register";
import MainResultados from "./MainResultados.jsx";
import MainAdmin from "./MainAdmin.jsx";
import MainEscritor from "./MainEscritor.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import RegisterSuccess from "./components/RegisterSuccess.jsx";
import RegisterError from "./components/RegisterError.jsx";
import LoginSuccess from "./components/LoginSuccess.jsx";
import LoginError from "./components/LoginError.jsx";
import FormularioSuccess from "./FormularioSucces.jsx";
import FormularioError from "./FormularioError.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<MainInicio />} />
          <Route path="/contacto" element={<MainContacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resultados" element={<MainResultados />} />
          <Route path="/successR" element={<RegisterSuccess />} />
          <Route path="/errorR" element={<RegisterError />} />
          <Route path="/successL" element={<LoginSuccess />} />
          <Route path="/errorL" element={<LoginError />} />
          <Route path="/successF" element={<FormularioSuccess />} />
          <Route path="/errorF" element={<FormularioError />} />
          <Route path="/admin" element={
          <PrivateRoute roles={['administrador']}>
            <MainAdmin />
          </PrivateRoute>
        } />
        <Route path="/escritor" element={
          <PrivateRoute roles={['escritor']}>
            <MainEscritor />
          </PrivateRoute>
        } />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRouter;
import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import MainInicio from './MainInicio';
import MainContacto from './MainContacto';
import IniciarSesion from './IniciarSesion';
import Header from "./Header";
import Footer from "./Footer";


function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<MainInicio />} />
          <Route path="/contacto" element={<MainContacto />} />
          <Route path="/iniciarSesion" element={<IniciarSesion />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRouter;
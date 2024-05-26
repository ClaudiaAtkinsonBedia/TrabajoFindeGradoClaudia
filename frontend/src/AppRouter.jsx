import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import MainInicio from './MainInicio';
import MainContacto from './MainContacto';
import Header from "./Header";
import Footer from "./Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import MainResultados from "./MainResultados";
import MainAdmin from "./MainAdmin";
import MainEscritor from "./MainEscritor";


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
          <Route path="/admin" element={<MainAdmin />} />
          <Route path="/escritor" element={<MainEscritor />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRouter;
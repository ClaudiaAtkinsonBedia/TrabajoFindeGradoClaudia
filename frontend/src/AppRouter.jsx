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


function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<MainInicio />} />
          <Route path="/contacto" element={<MainContacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRouter;
// Este es el componente principal de la app, aquí se renderizan los distintos componentes de la interfaz
import React from "react";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { NavBar } from "./components/NavBar";

function App() {
  const location = useLocation();

  return (
    /*Estilos para el scroll-bar, pendiente de modularizar*/
    <div className="container-scroll">

    {
      location.pathname !== '/' && <NavBar/>
    }

    <Routes>
    </Routes>

    </div>  
  )
}

export default App;

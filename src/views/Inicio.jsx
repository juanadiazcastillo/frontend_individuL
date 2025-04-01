import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const Inicio = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const navegar = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
      navegar("/");
    } else {
      setNombreUsuario(usuarioGuardado);
    }
  }, [navegar]);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("contraseña");
    navegar("/");
  };

  const iraservicio= () => {
    navegar("/servicios");
  };

  return (
    <Container>
      <h1 className="titulo">¡Bienvenido, {nombreUsuario}!</h1>
      <p className="subtitulo">Estás en la página de inicio.</p>
      <button className="btns" onClick={cerrarSesion}>Cerrar Sesión</button>
      <button className="btns" onClick={iraservicio}>servicios</button>
    </Container>
  );
};

export default Inicio;
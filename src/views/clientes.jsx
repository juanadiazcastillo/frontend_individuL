
// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaClientes from '../components/cliente/TablaClientes'; // Importa el componente de tabla
import { Container, Button, Row, Col } from "react-bootstrap";
import ModalRegistroCategoria from '../components/categorias/ModalRegistroCategoria';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';

// Declaración del componente Categorias
const Clientes = () => {
  // Estados para manejar los datos, carga y errores
  const [listaClientes, setListaClientes] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);        // Maneja errores de la petición
  const [mostrarModal, setMostrarModal] = useState(false);
   const [clientesFiltradas, setClientesFiltradas] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");
 

  const obtenerClientes = async () => { // Método renombrado a español
    try {
      const respuesta = await fetch('http://localhost:3000/api/clientes');
      if (!respuesta.ok) {
        throw new Error('Error al cargar las categorías');
      }
      const datos = await respuesta.json();
      setListaClientes(datos);
      setClientesFiltradas (datos);   // Actualiza el estado con los datos
      setCargando(false);           // Indica que la carga terminó
    } catch (error) {
      setErrorCarga(error.message); // Guarda el mensaje de error
      setCargando(false);           // Termina la carga aunque haya error
    }
  };


  // Lógica de obtención de datos con useEffect
  useEffect(() => {
    obtenerClientes();            // Ejecuta la función al montar el componente
  }, []);                           // Array vacío para que solo se ejecute una vez


  // Maneja los cambios en los inputs del modal
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    
    const filtradas = listaClientes.filter(
      (cliente) =>
        cliente.primer_nombre.toLowerCase().includes(texto) ||
        cliente.primer_apellido.toLowerCase().includes(texto)
    );
    setClientesFiltradas(filtradas);
  };



  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Clientes</h4>

        <Row>
    <Col lg={2} md={4} sm={4} xs={5}>
      <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
        Nuevo Cliente
      </Button>
    </Col>
    <Col lg={5} md={8} sm={8} xs={7}>
      <CuadroBusquedas
        textoBusqueda={textoBusqueda}
        manejarCambioBusqueda={manejarCambioBusqueda}
      />
    </Col>
  </Row>  

        {/* Pasa los estados como props al componente TablaCategorias */}
        <TablaClientes 
             
          clientes={clientesFiltradas} 
          manejarCambioInput={manejarCambioInput}
          cargando={cargando} 
          error={errorCarga} 
        />

      </Container>
    </>
  );
};

// Exportación del componente
export default Clientes;
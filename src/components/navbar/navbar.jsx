import React, {useState} from "react";
import LoginAndRegister from "./loginAndRegister";
import {Button, Offcanvas} from "react-bootstrap";

export const Navbar = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <nav className="navbar fixed-top bg-primary fondo-navbar">
      <div className="container-fluid">
        <img
          className="navbar-brand"
          src="../Logo-Respirar.png"
          alt="Logo Respirar"
          href="#"
          width="100px"
        />
        <Button
          className="navbar-toggler"
          onClick={handleShow}
        >
          <span className="navbar-dark navbar-toggler-icon"></span>
        </Button>
        <Offcanvas show={show} onHide={handleClose} placement='end'
                   className='fondo-menu, bg-primary'
        >
          <Offcanvas.Header className="box-Menu" closeButton>
            <p className="box-MenuText">Menú</p>
          </Offcanvas.Header>
                    <LoginAndRegister />
          <Offcanvas.Body className="fondo-menu">
            <div className="">
              <form className="d-flex mt-3 box-buscador" role="search">
                <input
                    className="box me-2"
                    type="search"
                    placeholder="Buscá tu estación"
                    aria-label="Search"
                />
                <button className="boton" type="submit">
                  Buscar
                </button>
              </form>
            </div>
          </Offcanvas.Body>

        </Offcanvas>
      </div>
    </nav>
  );
};

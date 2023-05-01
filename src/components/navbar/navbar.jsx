import React from "react";

export const Navbar = () => {
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
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-dark navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end bg-primary"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header bg-secondary">
            <h5 className="" id="offcanvasNavbarLabel">
              Menú
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="">
            <ul className="box-registro">
              <li className="">
                <a
                  className="fs-3 texto"
                  aria-current="page"
                  href="#"
                >
                  Registrate
                </a>
              </li>
            </ul>
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
        </div>
      </div>
    </nav>
  );
};

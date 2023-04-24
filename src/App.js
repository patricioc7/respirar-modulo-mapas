import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import './App.css';

function App() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBwnGHauDu6fcE0AIO2f3wdMyPxdoeK--I',
    });
    const center = useMemo(() => ({ lat: -34.58638551527179, lng: -58.40026132075488 }), []);

    return (
        <div >
            {/* START NAV BAR */}
            <nav class="navbar fixed-top bg-primary fondo-navbar">
                <div class="container-fluid">
                    <img class="navbar-brand" src="./Logo-Respirar.png" alt="Logo Respirar" href="#" width="100px"/>
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span class="navbar-dark navbar-toggler-icon"></span>
                    </button>
                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menú</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li class="nav-item">
                                    <a class="nav-link active text-primary" aria-current="page" href="#">Registrate</a>
                                </li>
                            </ul>
                            <form class="d-flex mt-3" role="search">
                                <input class="form-control me-2" type="search" placeholder="Buscá tu estación" aria-label="Search" />
                                <button class="btn btn-outline-success" type="submit">Buscar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
            {/* END NAV BAR */}
            
            {/* START MAP MODULE */}
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap
                    mapContainerClassName="map-container"
                    center={center}
                    zoom={20}
                >
                    <Marker position={{ lat: -34.58638551527179, lng: -58.40026132075488 }} icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"} />
                </GoogleMap>
            )}
            {/* END MAP MODULE */}
        </div>
    );
}

export default App;

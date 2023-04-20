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
        <h1>Respirar - Modulo Mapas</h1>
        {!isLoaded ? (
            <h1>Loading...</h1>
        ) : (
            <GoogleMap
                mapContainerClassName="map-container"
                center={center}
                zoom={10}
            >
                <Marker position={{ lat: -34.58638551527179, lng: -58.40026132075488 }}  icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}/>
            </GoogleMap>
        )}
    </div>
  );
}

export default App;

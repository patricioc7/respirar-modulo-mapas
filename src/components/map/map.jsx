import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import icon from "../../images/pinIcon.png";
import L from "leaflet";

export const Map = ({ stations }) => {
  // default on Buenos Aires (if user does not accept location access request
  const [coords, setCoords] = useState({
    latitude: "-34.58638551527179",
    longitude: "-58.40026132075488",
  });

  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
  };

  const error = (err) => {
    if (
      err.code === 1 || //if user denied accessing the location
      err.code === 2 || //for any internal errors
      err.code === 3 //error due to timeout
    ) {
      alert(err.message);
    } else {
      alert(err);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      centerMapOnUserLocation,
      error,
      options
    );
  }, []);

  const centerMapOnUserLocation = (position) => {
    setCoords({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  const customIcon = new L.Icon({
    //creating a custom icon to use in Marker
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [5, 30],
  });

  const MapView = () => {
    let map = useMap();
    map.setView([coords.latitude, coords.longitude], map.getZoom());
    //Sets geographical center and zoom for the view of the map
    return null;
  };

  return (
    <MapContainer
      classsName="map"
      center={[coords.latitude, coords.longitude]}
      zoom={10}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>
        contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.map((station) => {
        console.log(station);
        return (
          // TODO hacer bien este markup que es horrible
          <Marker
            icon={customIcon}
            position={[
              station.coordinates.latitude,
              station.coordinates.longitude,
            ]}
          >
            <Popup>
              <span>Estación: {station.name}</span> <br />
              <span>Temperatura: {station.temperature}ºC</span>
              <br />
              <span>Calidad pm1: {station.pm1}</span>
              <br />
              <span>Calidad pm10: {station.pm10}</span>
              <br />
              <span>Calidad pm25: {station.pm25}</span>
              <br />
            </Popup>
          </Marker>
        );
      })}

      <MapView />
    </MapContainer>
  );
};

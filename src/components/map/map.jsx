import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import React, {useContext, useEffect, useState} from "react";
import "leaflet/dist/leaflet.css";
import icon from "../../images/pinIcon.png";
import L from "leaflet";
import {apiClient} from "../../services/apiClient";
import {SessionContext} from "../../context/sessionContext";
import {MapPopup} from "./mapPopup";

export const Map = () => {
  const [stations, setStations] = useState([]);
  // default on Buenos Aires (if user does not accept location access request)
  const [coords, setCoords] = useState({
    latitude: "-34.58638551527179",
    longitude: "-58.40026132075488",
  });

  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
  };

  const session = useContext(SessionContext);

  useEffect(() => {
    apiClient.getStations(session).then((response) => {
      setStations(response.data);
    });
  }, []);

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
              <MapPopup station={station} />
            </Popup>
          </Marker>
        );
      })}

      <MapView />
    </MapContainer>
  );
};

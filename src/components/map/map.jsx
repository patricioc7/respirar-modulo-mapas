import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import icon from "../../images/pinIcon.png";
import L from "leaflet";
import { MapPopup } from "./mapPopup";
import { apiClient } from "../../services/apiClient";

export const Map = ({ stations, coords, setCoords }) => {
  const [currentStation, setCurrentStation] = useState({});

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
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [5, 30],
  });

  const MapView = () => {
    let map = useMap();
    map.setView([coords.latitude, coords.longitude], map.getZoom());
    return null;
  };

  const handleMarkerClick = (id) => {
    apiClient.getStation(id).then((response) => {
      setCurrentStation(response.data);
    });
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
        if (station.coordinates?.latitude && station.coordinates?.longitude) {
          return (
            // TODO hacer bien este markup que es horrible
            <Marker
              icon={customIcon}
              position={[
                station.coordinates.latitude,
                station.coordinates.longitude,
              ]}
              // Marker no tiene onClick nativo
              eventHandlers={{
                click: () => {
                  handleMarkerClick(station.id);
                },
              }}
              key={station.id}
            >
              <Popup>
                <MapPopup station={currentStation} />
              </Popup>
            </Marker>
          );
        }
      })}

      <MapView />
    </MapContainer>
  );
};

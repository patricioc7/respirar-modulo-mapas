import React, { useEffect, useState } from "react";
import "./App.css";
import { Map } from "./components/map/map";
import { Navbar } from "./components/navbar/navbar";

function App() {
  const [coords, setCoords] = useState({
    latitude: "-34.58638551527179",
    longitude: "-58.40026132075488",
  });
  const [cityName, setCityName] = useState("");

  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      getCurrentCityName,
      error,
      options
    );
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

  const getCurrentCityName = (position) => {
    setCoords({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });

    let url =
      "https://nominatim.openstreetmap.org/reverse?format=jsonv2" +
      "&lat=" +
      coords.latitude +
      "&lon=" +
      coords.longitude;

    fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "https://o2cj2q.csb.app",
      },
    })
      .then((response) => response.json())
      .then((data) => setCityName(data.display_name));
  };

  return (
    <div>
      {/* START NAV BAR */}
      <Navbar />
      {/* END NAV BAR */}

      <Map coords={coords} dispaly_name={cityName} />
    </div>
  );
}

export default App;

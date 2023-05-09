import React, { useEffect, useState } from "react";
import "./App.css";
import { Map } from "./components/map/map";
import { Navbar } from "./components/navbar/navbar";
import { getStations } from "./services/stationsService";

function App() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    getStations(undefined).then((mappedStations) => {
      setStations(mappedStations);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Map stations={stations} />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
import { Map } from "./components/map/map";
import { Navbar } from "./components/navbar/navbar";
import { getSessionCookie } from "./services/sessionCookie";
import { SessionContext } from "./context/sessionContext";
import { apiClient } from "./services/apiClient";

function App() {
  const [stations, setStations] = useState([]);
  const [session, setSession] = useState(getSessionCookie());
  const [onlyMyStations, setOnlyMyStations] = useState(false);

  // default on Buenos Aires (if user does not accept location access request)
  const [coords, setCoords] = useState({
    latitude: "-34.58638551527179",
    longitude: "-58.40026132075488",
  });

  useEffect(() => {
    apiClient.getStations(session?.token, onlyMyStations).then((response) => {
      setStations(response.data);
    });
  }, [onlyMyStations]);

  useEffect(() => {
    setSession(getSessionCookie());
  }, [session?.token]);

  return (
    <SessionContext.Provider value={session}>
      <div>
        <Navbar
          stations={stations}
          setCoords={setCoords}
          setOnlyMyStations={setOnlyMyStations}
          onlyMyStations={onlyMyStations}
        />
        <div className="map-container">
          <Map stations={stations} coords={coords} setCoords={setCoords} />
        </div>
      </div>
    </SessionContext.Provider>
  );
}

export default App;

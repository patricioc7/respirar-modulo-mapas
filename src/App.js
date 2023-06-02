import React, {useContext, useEffect, useState} from "react";
import "./App.css";
import { Map } from "./components/map/map";
import { Navbar } from "./components/navbar/navbar";
import { getSessionCookie } from "./services/sessionCookie";
import { SessionContext } from "./context/sessionContext";
import {apiClient} from "./services/apiClient";

function App() {

    const [stations, setStations] = useState([]);
    const [session, setSession] = useState(getSessionCookie());

    // default on Buenos Aires (if user does not accept location access request)
    const [coords, setCoords] = useState({
        latitude: "-34.58638551527179",
        longitude: "-58.40026132075488",
    });

    useEffect(() => {
        apiClient.getStations(session).then((response) => {
            setStations(response.data);
        });
    }, []);

    useEffect(() => {
        setSession(getSessionCookie());
    }, [session]);

  return (
      <SessionContext.Provider value={session}>
        <div>
          <Navbar stations={stations} setCoords={setCoords} />
            <div className="map-container">

                <Map stations={stations} coords={coords} setCoords={setCoords} />
            </div>
        </div>
      </SessionContext.Provider>
  );
}

export default App;

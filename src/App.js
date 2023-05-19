import React, { useEffect, useState } from "react";
import "./App.css";
import { Map } from "./components/map/map";
import { Navbar } from "./components/navbar/navbar";
import { getSessionCookie } from "./services/sessionCookie";
import { SessionContext } from "./context/sessionContext";

function App() {

    const [session, setSession] = useState(getSessionCookie());

    useEffect(() => {
        setSession(getSessionCookie());
    }, [session]);

  return (
      <SessionContext.Provider value={session}>
    <div>
      <Navbar />
      <Map />
    </div>
      </SessionContext.Provider>
  );
}

export default App;

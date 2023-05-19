import { getSessionCookie } from "../../../respirar-modulo-mapas/src/services/sessionCookie";
import React from "react";

export const SessionContext = React.createContext(getSessionCookie());

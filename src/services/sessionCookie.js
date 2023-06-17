import Cookies from "js-cookie";

export const setSessionCookie = (session) => {
  Cookies.remove("session");
  Cookies.set("session", JSON.stringify(session), { expires: 14 });
};

export const getSessionCookie = () => {
  const sessionCookie = Cookies.get("session");

  if (sessionCookie === undefined) {
    return undefined;
  } else {
    return JSON.parse(sessionCookie);
  }
};

export const deleteSessionCookie = () => {
  Cookies.remove("session");
};

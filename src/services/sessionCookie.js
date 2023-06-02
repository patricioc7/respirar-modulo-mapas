import Cookies from "js-cookie";

export const setSessionCookie = (session) => {
  console.log(session)
  Cookies.remove("session");
  Cookies.set("session", JSON.stringify(session), { expires: 14 });
};

export const getSessionCookie = () => {
  const sessionCookie = Cookies.get("session");

  if (sessionCookie === undefined) {
    return undefined;
  } else {
    console.log(sessionCookie)
    return JSON.parse(sessionCookie);
  }
};

export const deleteSessionCookie = () => {
  Cookies.remove("session");
};

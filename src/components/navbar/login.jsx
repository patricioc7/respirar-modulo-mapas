import { Alert, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, { useContext, useState } from "react";
import {
  setSessionCookie,
  deleteSessionCookie,
} from "../../services/sessionCookie";
import { apiClient } from "../../services/apiClient";
import { SessionContext } from "../../context/sessionContext";

const Login = ({ setOnlyMyStations, onlyMyStations }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const session = useContext(SessionContext);

  const handleCloseModals = () => {
    setShowLoginModal(false);
    setLoginError(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    apiClient
      .login({ username, password })
      .then((response) => {
        setSessionCookie(response.data);
        window.location.reload();
        setShowLoginModal(false);
      })
      .catch((_error) => {
        console.log(_error);
        setLoginError(true);
      });
  };

  const handleLogout = () => {
    deleteSessionCookie();
    window.location.reload();
  };

  const handleOnlyMyStationsClick = (e) => {
    console.log(e.target.checked);
    setOnlyMyStations(e.target.checked);
  };

  return (
    <>
      {session ? (
        <>
          <div className="loggedInMenu">
            <span className="loginText">
              {session.username}{" "}
              <Button
                className="logoutButton loginButtons"
                variant="link"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </span>
            <div className="myStationsContainer">
              <Form>
                <div className="mb-2 whiteText">
                  <Form.Check
                    id={`default-checkbox`}
                    label={`Mostrar solo mis estaciones`}
                    checked={onlyMyStations}
                    onChange={(e) => handleOnlyMyStationsClick(e)}
                  ></Form.Check>
                </div>
              </Form>
            </div>
          </div>
        </>
      ) : (
        <div className="box-registro">
          <Button
            variant="primary"
            className="loginButton loginButtons"
            onClick={() => setShowLoginModal(true)}
          >
            Iniciá sesión
          </Button>
        </div>
      )}

      <Modal className="modal" show={showLoginModal} onHide={handleCloseModals}>
        <Modal.Header className="bg-secondary" closeButton></Modal.Header>
        <Modal.Body className="bg-primary">
          <div className="container-fluid row">
            <div className="col-6 icon-login"></div>
            <div className="col-6">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="loginText">Email:</Form.Label>
                  <input
                    className="inputLogin"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="loginText">Password:</Form.Label>
                  <input
                    className="inputLogin"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <button
                  className="buttonLogin"
                  onClick={(event) => handleLogin(event)}
                ></button>
              </Form>
            </div>
          </div>
          {loginError && (
            <Alert variant="danger">Credenciales incorrectas.</Alert>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;

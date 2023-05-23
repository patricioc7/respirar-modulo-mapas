import { Alert, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import {
  setSessionCookie,
  deleteSessionCookie,
} from "../../services/sessionCookie";
import {apiClient} from "../../services/apiClient";
import {SessionContext} from "../../context/sessionContext";

const LoginAndRegister = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState(false);

  const session = useContext(SessionContext);

  const handleCloseModals = () => {
    setShowLoginModal(false);
    setLoginError(false);
  };

  const handleLogin = () => {
    apiClient
      .login({username, password})
      .then((response) => {
        setSessionCookie(response.data.token);
        window.location.reload();
        setShowLoginModal(false);
      })
      .catch((_error) => setLoginError(true));
  };

  const handleLogout = () => {
    deleteSessionCookie();
    window.location.reload();
  };

  return (
    <>
      {session ? (
          <Button onClick={handleLogout}>Logout</Button>
      ) : (
          <div className="box-registro">
          <p className="texto" onClick={() => setShowLoginModal(true)}>
            Iniciá sesión
          </p>
          </div>
      )}

      <Modal className="modal" show={showLoginModal} onHide={handleCloseModals}>
        <Modal.Header className="bg-secondary" closeButton>
        </Modal.Header>
        <Modal.Body className="bg-primary">
          <div className="container-fluid row">
          <div className="col-6 icon-login">
          </div>
          <div className="col-6">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="loginText">Email:</Form.Label>
              <input
                className="inputLogin"
                type="text"
                onChange={(e) =>
                  setUsername( e.target.value)
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="loginText">Password:</Form.Label>
              <input
                className="inputLogin"
                type="password"
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </Form.Group>
            <button className="buttonLogin" onClick={handleLogin}>
          </button>
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

export default LoginAndRegister;

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
  const [userNameAndPassword, setUsernameAndPassword] = useState({});
  const [loginError, setLoginError] = useState(false);

  const session = useContext(SessionContext);

  const handleLoginFormChanges = (field, value) => {
    setUsernameAndPassword((prevState) => {
      return {
        ...prevState,
        [field]: value,
      };
    });
  };

  const handleCloseModals = () => {
    setShowLoginModal(false);
    setLoginError(false);
  };

  const handleLogin = () => {
    apiClient
      .login(userNameAndPassword)
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
          <Button variant="link" onClick={() => setShowLoginModal(true)}>
            Login
          </Button>
      )}

      <Modal show={showLoginModal} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="text"
                placeholder="email"
                onChange={(e) =>
                  handleLoginFormChanges("username", e.target.value)
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  handleLoginFormChanges("password", e.target.value)
                }
              />
            </Form.Group>
          </Form>
          {loginError && (
            <Alert variant="danger">Credenciales incorrectas.</Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default LoginAndRegister;

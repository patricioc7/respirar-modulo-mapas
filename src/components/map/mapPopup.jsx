import React, { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { apiClient } from "../../services/apiClient";
import { CustomChart } from "../charts/charts";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export const MapPopup = ({ station }) => {
  const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1);
  const today = localISOTime.split("T")[0];
  const [stationHistory, setStationHistory] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [parameter, setParameter] = useState("CO");

  const fetchHistoryData = () => {
    if (new Date(fromDate) > new Date(toDate)) {
      alert('La fecha "hasta" no puede ser anterior a la fecha "desde"');
      return;
    }
    if (station.id) {
      apiClient
        .retrieveHistory(station.id, fromDate, toDate, parameter)
        .then((response) => {
          setStationHistory(response.data);
        });
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, [station]);

  return (
    <div key={station.id}>
      <div className="mapPopupContent">
        <span className="nombreEstacion">{station.name}</span> <br />
        <div className="detallesEstacion">
          <ListGroup>
            <ListGroup.Item>
              <strong>Temperatura:</strong> {station.temperature}ºC
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Humedad relativa:</strong>{" "}
              {station.humidity ? station.humidity * 100 : 0}%
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>CO:</strong> {station.CO}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Calidad pm1:</strong> {station.pm1}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Calidad pm10:</strong> {station.pm10}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Calidad pm25:</strong> {station.pm25}
            </ListGroup.Item>
          </ListGroup>
        </div>
        <Button onClick={() => setShowLoginModal(true)}>
          Ver datos históricos
        </Button>
      </div>

      <Modal
        className="modal graphModal"
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
      >
        <Modal.Header className="bg-secondary" closeButton>
          <span className="modalTitle">{station.name}</span>
        </Modal.Header>
        <Modal.Body className="bg-primary">
          <div className="controlsContainer">
            <Row>
              <Form.Group as={Col}>
                <Form.Control
                  type="date"
                  name="datepic"
                  max={today}
                  placeholder="DateRange"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  type="date"
                  name="datepic"
                  placeholder="DateRange"
                  max={today}
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Select
                  className="parametrosSelect"
                  size="sm"
                  onChange={(e) => setParameter(e.target.value)}
                >
                  {station?.availableParams?.length &&
                    station?.availableParams?.map((parameter) => {
                      return (
                        <option key={parameter} value={parameter}>
                          {parameter}
                        </option>
                      );
                    })}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col}>
                <Button
                  className="botonActualizar"
                  onClick={() => fetchHistoryData()}
                >
                  Actualizar
                </Button>
              </Form.Group>
            </Row>
          </div>

          <CustomChart
            historyData={stationHistory}
            stationName={station.name}
            parameter={parameter}
            fromDate={fromDate}
            toDate={toDate}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

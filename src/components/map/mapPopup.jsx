import React, {useState} from "react";
import { Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {apiClient} from "../../services/apiClient";
import {CustomChart} from "../charts/charts";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export const MapPopup = ({station}) => {
    const [stationHistory, setStationHistory] = useState({});
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [parameter, setParameter] = useState("temperature");
    const [time, setTime] = useState("day");

    const handleHistoryModalOpen = () => {
        apiClient.retrieveHistory(station.id, time, parameter).then((response) => {
            setStationHistory(response.data)
            setShowLoginModal(true);
        })
    }

    const handleChangeOnControls = (type, value) => {
        // TODO quizás transformar esto en un switch si llega a crecer mucho
        if(type === 'parameter') {
            setParameter(value)
        } else {
            setTime(value)
        }

        handleHistoryModalOpen()
    }


    return (<>
        <div>
        <span>Estación: {station.name}</span> <br/>
        <span>Temperatura: {station.temperature}ºC</span>
        <br/>
        <span>Calidad pm1: {station.pm1}</span>
        <br/>
        <span>Calidad pm10: {station.pm10}</span>
        <br/>
        <span>Calidad pm25: {station.pm25}</span>
        <br/>
        <Button onClick={() => handleHistoryModalOpen()}>Ver datos históricos</Button>
    </div>

        <Modal className="modal" show={showLoginModal} onHide={() => setShowLoginModal(false)}>
            <Modal.Header className="bg-secondary" closeButton>
            </Modal.Header>
            <Modal.Body className="bg-primary">
                <Row className="mb-2">
                    <Form.Group as={Col}>
                        <Form.Select size="sm" onChange={(e) => handleChangeOnControls('time', e.target.value)}>
                            <option>Tiempo</option>
                            <option value="DIA">Día</option>
                            <option value="MES">Mes</option>
                            <option value="ANO">Año</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Select size="sm" onChange={(e) => handleChangeOnControls('parameter', e.target.value)}>
                            <option>Parámetro</option>
                            <option value="temperature">Temperatura</option>
                            <option value="qualitypm1">Calidad PM1</option>
                            <option value="qualitypm10">Calidad PM10</option>
                            <option value="qualitypm25">Calidad PM25</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <CustomChart historyData={stationHistory} stationName={station.name} parameter={parameter} time={time}/>
            </Modal.Body>
        </Modal>
        </>)
}

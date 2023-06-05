import React, {useEffect, useState} from "react";
import { Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {apiClient} from "../../services/apiClient";
import {CustomChart} from "../charts/charts";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {getSessionCookie} from "../../services/sessionCookie";

export const MapPopup = ({station}) => {
    const [stationHistory, setStationHistory] = useState({});
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [parameter, setParameter] = useState("SO2");

    const fetchHistoryData = () => {
        apiClient.retrieveHistory(station.id, fromDate, toDate, parameter).then((response) => {
            setStationHistory(response.data)
        })
    }

    useEffect(() => {
        fetchHistoryData()
    }, []);


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
        <Button onClick={() => setShowLoginModal(true)}>Ver datos históricos</Button>
    </div>

        <Modal className="modal" show={showLoginModal} onHide={() => setShowLoginModal(false)}>
            <Modal.Header className="bg-secondary" closeButton>
            </Modal.Header>
            <Modal.Body className="bg-primary">
                <Row className="mb-4">
                    <Form.Group as={Col}>
                        <Form.Control
                            type="date"
                            name="datepic"
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
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Select size="sm" onChange={(e) => setParameter(e.target.value)}>
                            <option>Parámetro</option>
                            <option value="temperature">Temperatura</option>
                            <option value="qualitypm1">Calidad PM1</option>
                            <option value="qualitypm10">Calidad PM10</option>
                            <option value="qualitypm25">Calidad PM25</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Button onClick={()=> fetchHistoryData()}>Actualizar</Button>
                    </Form.Group>
                </Row>
                <CustomChart historyData={stationHistory} stationName={station.name} parameter={parameter} fromDate={fromDate} toDate={toDate}/>
            </Modal.Body>
        </Modal>
        </>)
}

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
    const today = new Date().toISOString().split('T')[0]
    const [stationHistory, setStationHistory] = useState({});
    const [availableParams, setAvailableParams] = useState([]);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
    const [toDate, setToDate] = useState(today);
    const [parameter, setParameter] = useState("temperature");

    const fetchHistoryData = () => {
        if(new Date(fromDate) > new Date(toDate)){
            alert('La fecha "hasta" no puede ser anterior a la fecha "desde"')
            return;
        }
        apiClient.retrieveHistory(station.id, fromDate, toDate, parameter).then((response) => {
            setStationHistory(response.data)
        })
    }

    const fetchAvailableParameters = () => {
        apiClient.retrieveAvailableParameters(station.id).then((response) => {
            console.log(response.data)
            setAvailableParams(response.data)
        })
    }

    useEffect(() => {
        fetchAvailableParameters()
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
                        <Form.Select size="sm" onChange={(e) => setParameter(e.target.value)}>
                            {availableParams.length && availableParams.map(parameter => {
                                return (<option value={parameter}>{parameter}</option>)
                            })}

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
